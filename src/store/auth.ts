import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {AuthState} from "@/types/auth";
import {decodeToken} from "@/lib/auth/jwt";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            userId: null,
            email: null,

            setTokens: (accessToken, refreshToken) => {
                const decoded = decodeToken(accessToken);
                if (!decoded?.sub) {
                    console.error('Failed to decode JWT token');
                    return;
                }

                set({
                    userId: decoded.sub,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true
                })
            },

            signIn: (tokens) => {
                const decoded = decodeToken(tokens.accessToken);
                if (!decoded?.sub) {
                    console.error('Failed to decode JWT token');
                    return;
                }

                set({
                    userId: decoded.sub,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                });
            },

            signOut: () =>
                set({
                    userId: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false
                }),
        }),
        {
            name: 'auth_storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                userId: state.userId,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);