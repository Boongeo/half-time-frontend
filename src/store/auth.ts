import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware/persist";

interface User {
    id: string;
    email: string;
    name?: string;
    role?: 'mentor' | 'mentee';
    profileImage?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    signIn: (token: string, user: User) => void;
    signOut: () => void;
    updateUser: (userData: Partial<User>) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user
                }),

            setToken: (token) =>
                set({ token }),

            signIn: (token, user) =>
                set({
                    token,
                    user,
                    isAuthenticated: true,
                    error: null
                }),

            signOut: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null
                }),

            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),

            clearError: () =>
                set({ error: null })
        }),
        {
            name: 'auth_storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);