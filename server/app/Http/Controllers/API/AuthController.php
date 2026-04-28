<?php
import React, { createContext, useContext, useState, useEffect, FC, ReactNode } from "react";
import type { UserDetails } from "../interfaces/AuthInterface";
import AuthService from "../services/AuthService";

interface AuthContextType {
    user: UserDetails | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (username: string, password: string) => {
        try {
            const res = await AuthService.login({ username, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                setUser(res.data);
            } else {
                console.error("Unexpected status during login:", res.status);
            }
        } catch (error) {
            console.error("Unexpected server error during login:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const res = await AuthService.logout();
            if (res.status === 200) {
                localStorage.removeItem("token");
                setUser(null);
            } else {
                console.error("Unexpected status during logout:", res.status);
            }
        } catch (error) {
            console.error("Unexpected server error during logout:", error);
            throw error;
        } finally {

            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const checkAuth = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await AuthService.me();
                if (res.status === 200) {
                    setUser(res.data);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
                console.error("Auth check failed:", error);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
