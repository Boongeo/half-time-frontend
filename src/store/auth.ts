import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware/persist";
import {AuthResponseUser, AuthState} from "@/types/auth";

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

            signIn: (token: string, apiUser: AuthResponseUser) =>
                set({
                    token,
                    user: {
                        ...apiUser,
                        name: undefined,
                        role: undefined,
                        profileImage: undefined
                    },
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