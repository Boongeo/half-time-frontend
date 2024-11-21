import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {AuthState} from "@/types/auth";
import {decodeToken} from "@/lib/auth/jwt";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setTokens: (accessToken: string, refreshToken: string) => {
                const decoded = decodeToken(accessToken);
                if (!decoded) {
                    console.error('Failed to decode JWT token');
                    return;
                }

                set({
                    user: {
                        id: decoded.sub,
                        email: decoded.email,
                        role: decoded.role
                    },
                    accessToken,
                    refreshToken,
                    isAuthenticated: true
                })
            },

            signIn: (tokens: { accessToken: string, refreshToken: string }) => {
                const decoded = decodeToken(tokens.accessToken);
                if (!decoded) {
                    console.error('Failed to decode JWT token');
                    return;
                }

                set({
                    user: {
                        id: decoded.sub,
                        email: decoded.email,
                        role: decoded.role
                    },
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                });
            },

            signOut: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false
                }),
        }),
        {
            name: 'auth_storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);