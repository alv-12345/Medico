import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import api from '../services/api';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ChatBox = () => {
    const { user, token } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && user) {
            fetchChats();
        }
    }, [isOpen, user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChats = async () => {
        try {
            const { data } = await api.get('/user/get-chats');
            if (data.success) {
                setMessages(data.chats);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (!user) {
            toast.warn('Please login to use the chatbox');
            setIsOpen(false);
            return;
        }

        try {
            const { data } = await api.post('/user/send-message', { message: input });
            if (data.success) {
                setInput('');
                fetchChats();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleClose = async () => {
        try {
            await api.post('/user/clear-chats');
            setMessages([]);
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to clear chats:', error);
            setIsOpen(false); // Still close it even if clear fails
        }
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white/95 backdrop-blur-xl w-80 sm:w-96 h-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl flex flex-col border border-white/20 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-emerald-600 p-5 flex justify-between items-center text-white shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                                    <img src={assets.mlogo} alt="Logo" className="w-6 invert" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-wide">Medico Assistant</h3>
                                <p className="text-[10px] text-emerald-50/80 font-medium">Always active</p>
                            </div>
                        </div>
                        <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all font-light text-2xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 backdrop-blur-sm shadow-inner">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-10">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">Hello there!</p>
                                    <p className="text-gray-500 text-xs mt-1">I'm your assistant. How can I facilitate your healthcare journey today?</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-y-2 duration-300`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap animate-in fade-in slide-in-from-y-2 ${msg.sender === 'user'
                                            ? 'bg-primary text-white rounded-tr-none shadow-emerald-100'
                                            : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                                            }`}
                                    >
                                        {msg.message}
                                        <div className={`text-[9px] mt-1.5 font-medium opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.date ? new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Footer Input */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100/50 flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write your message..."
                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-primary text-white w-11 h-11 flex items-center justify-center rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-emerald-100"
                        >
                            <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Float Button (Toggle) */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-3xl shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3 group border border-white/20"
                >
                    <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                        <img src={assets.chats_icon} alt="Chat" className="w-5 h-5 invert" />
                    </div>
                    <span className="font-bold text-sm pr-1">Need help?</span>
                </motion.button>
            )}
        </div>
    );
};

export default ChatBox;
