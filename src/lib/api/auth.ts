interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
    }
}

interface CheckEmailResponse {
    exists: boolean;
}

interface VerifyEmailResponse {
    success: boolean;
    verificationId: string;
}

interface VerifyCodeResponse {
    success: boolean;
}

export const authApi = {
    // 이메일 존재 여부 확인
    checkEmail: async (email: string): Promise<CheckEmailResponse> => {
        const response = await fetch('/api/auth/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Failed to check email');
        return response.json();
    },

    // 이메일 인증 코드 요청
    requestVerification: async (email: string): Promise<VerifyEmailResponse> => {
        const response = await fetch('/api/auth/request-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Failed to send verification code');
        return response.json();
    },

    // 인증 코드 확인
    verifyCode: async (verificationId: string, code: string): Promise<VerifyCodeResponse> => {
        const response = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationId, code })
        });
        if (!response.ok) throw new Error('Failed to verify code');
        return response.json();
    },

    // 로그인
    signIn: async (data: {email: string, password: string}): Promise<AuthResponse> => {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to sign in');
        return response.json();
    },

    // 회원가입
    signUp: async (data: {email: string, password: string}): Promise<AuthResponse> => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to sign up');
        return response.json();
    }
};