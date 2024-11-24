import {User, UserState} from "@/types/user";
import {create} from "zustand";
import {userApi} from "@/lib/api/user";

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    fetchUser: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await userApi.getMe();

            if (response.success) {
                set({ user: response.data, isLoading: false });
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateProfile: async (data: FormData | Partial<User>) => {
        try {
            set({ isLoading: true, error: null });

            let formData: FormData;
            if (data instanceof FormData) {
                formData = data;
            } else {
                formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== null) {
                        formData.append(key, value as string | Blob);
                    }
                });
            }

            const response = await userApi.updateProfile(formData);
            if (response.success) {
                set({
                    user: response.data,
                    isLoading: false
                });
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    setUser: (user) => set({ user }),
    reset: () => set({ user: null, error: null, isLoading: false })
}));