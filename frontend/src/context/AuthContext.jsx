import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContextCore';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [role, setRole] = useState(sessionStorage.getItem('role') || 'user');
    const [loading, setLoading] = useState(true);

    const logout = React.useCallback(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
        setUser(null);
        setRole('user');
        setToken(null);
    }, []);

    const loadUserProfileData = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const role = sessionStorage.getItem('role');

            if (!token) {
                setLoading(false);
                return;
            }

            let endpoint = '';
            if (role === 'user') endpoint = '/user/get-profile';
            if (role === 'doctor') endpoint = '/doctor/profile';
            if (role === 'admin') endpoint = '/admin/dashboard';

            if (endpoint) {
                const { data } = await api.get(endpoint);
                if (data.success) {
                    if (role === 'admin') {
                        // Admin doesn't have a profile endpoint, but we can use dashboard to verify token
                        const storedUser = sessionStorage.getItem('user');
                        setUser(storedUser ? JSON.parse(storedUser) : { name: 'Admin', email: 'admin@medico.com' });
                    } else {
                        const userData = data.userData || data.profileData;
                        if (userData && userData.image === 'null') userData.image = null;
                        setUser(userData);
                        // Ensure role state matches storage
                        setRole(role);
                    }
                } else {
                    console.log("Validation failed:", data.message);
                    logout();
                }
            } else {
                // Unknown role or no endpoint
                setRole('user'); // Reset to default
                logout();
            }

        } catch (error) {
            console.error("Auth validation error:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // One-time cleanup of legacy persistent data from localStorage (optional but helpful for migration)
        const legacyKeys = ['token', 'user', 'role'];
        legacyKeys.forEach(key => localStorage.removeItem(key));

        // Intercept global 401/403 to trigger logout
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        loadUserProfileData();

        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, [logout]);


    const login = async (email, password, loginRole = 'user') => {
        let endpoint = '/user/login';
        if (loginRole === 'doctor') endpoint = '/doctor/login';
        if (loginRole === 'admin') endpoint = '/admin/login';

        const { data } = await api.post(endpoint, { email, password });

        if (data.success) {
            sessionStorage.setItem('token', data.token);
            // Unified user object for context. Backend returns different formats, so we normalize.
            const userData = data.userData || { name: loginRole === 'admin' ? 'Admin' : 'User', email };
            if (userData && userData.image === 'null') userData.image = null;
            sessionStorage.setItem('role', loginRole);

            setUser(userData);
            setRole(loginRole);
            setToken(data.token);
            await loadUserProfileData(); // Ensure full profile is synced
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    const signup = async (userData) => {
        const { data } = await api.post('/user/register', userData);
        if (data.success) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('role', 'user');
            const userData = data.userData;
            if (userData && userData.image === 'null') userData.image = null;
            setUser(userData);
            setRole('user'); // Normalized role setting (Signup is only for users)
            setToken(data.token);
            await loadUserProfileData(); // Ensure full profile is synced
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, login, signup, logout, loading, setUser, loadUserProfileData }}>
            {children}
        </AuthContext.Provider>
    );
};
