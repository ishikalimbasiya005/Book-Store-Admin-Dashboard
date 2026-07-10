import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { message } from 'antd';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    register: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (user) => {
                set({ isAuthenticated: true, user });
            },
            register: (user) => {
                // Typically you'd call an API here. For now, we simulate success.
                // We won't log them in automatically upon registration to follow requirement: 
                // "After successful registration, automatically redirect the user to the Login page."
                // The UI layer will handle the redirect.
                console.log("Registered user", user);
            },
            logout: () => {
                set({ isAuthenticated: false, user: null });
                message.success("Logged out successfully");
            }
        }),
        {
            name: 'auth-store', // persist to local storage
        }
    )
);
