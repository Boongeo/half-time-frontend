import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {AuthState} from "@/types/auth";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setTokens: (accessToken: string, refreshToken: string) =>
                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true
                }),

            signIn: (tokens: { accessToken: string, refreshToken: string }) =>
                set({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                }),

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
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);