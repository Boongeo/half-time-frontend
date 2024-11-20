interface AuthResponse {
    token: string;
    formData: {
        nickname: "",
        interest: "",
        introduction: "",
        profileImage: null,
        profileFile: null,
    }
}

export const registerAPI = {
    signUp: async (formData: FormData) => {
        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to submit profile.");
        }

        const data = await response.json();
        return data;
    },
};
