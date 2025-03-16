// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    element: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    } 

    return <>{element}</>;
};

