// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { loggedInUser } = useSelector((state: any) => state.loggedUserDetails);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const isTokenExpired = useCallback((): boolean => {
        try {
            const currentTime = new Date();
            const expiryDate: any = Cookies.get('tokenExpiry')
            const futureTime = new Date(expiryDate);
            if (currentTime > futureTime) {
                logout();
            }
            return currentTime > futureTime; // Expired if token's exp < current time
        } catch (error) {
            return true;
        }
    }, []);
    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token && !isTokenExpired()) {
            setIsAuthenticated(true);
            navigate(loggedInUser.userType === 'user' ? '/user-form' : '/admin');
        } else {
            logout();
        }
    }, [navigate, isTokenExpired, loggedInUser]);

    // check every 1 minute to logout
    useEffect(() => {
        if (isAuthenticated) {
            const intervalId = setInterval(isTokenExpired, 60 * 1000);
            return () => {
                clearInterval(intervalId); // Clean up the interval when the component unmounts
            };
        }
    }, [isTokenExpired, isAuthenticated])

    const login = () => {
        if (!isTokenExpired()) {
            setIsAuthenticated(true);
            navigate('/stepper');
        }
    };

    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('tokenExpiry');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

