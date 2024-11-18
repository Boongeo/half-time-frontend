interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        isNewUser: boolean;
    }
}

export const authApi = {
    verifyEmail: async (email: string) => {
        const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error();
        return true;
    },

    signInOrSignUp: async (data: {email: string, password: string}): Promise<AuthResponse> => {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error();
        return response.json();
    }
};