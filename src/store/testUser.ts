import {create} from "zustand";

export const useTestUserStore = create(() => ({
    user: { id: "user001", name: "Test User" },
}));

