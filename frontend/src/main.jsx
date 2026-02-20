import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import ErrorBoundary from './components/ErrorBoundary.jsx'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "AbeY-7Sus0s67NoSihgGqq6LkomqPN0zymJK4JAe4VNbxdUKlkgmIkJc-T5v57Uton6hZ2JCxzi2MwW-",
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppContextProvider>
        <PayPalScriptProvider options={initialOptions}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PayPalScriptProvider>
      </AppContextProvider>
    </AuthProvider>
  </BrowserRouter>,
)
