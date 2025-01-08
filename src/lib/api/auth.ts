import {AuthResponse, ApiResponse, CheckEmailResponse, VerifyCodeResponse, VerifyEmailResponse} from "@/types/api";
import {getBaseUrl} from "@/lib/utils/api";

const baseUrl = getBaseUrl();

export const authApi = {
    // 이메일 존재 여부 확인
    checkEmail: async (email: string): Promise<CheckEmailResponse> => {
        const url = new URL('/api/auth/check-email', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Failed to check email');
        return response.json();
    },

    // 이메일 인증 코드 요청
    requestVerification: async (email: string): Promise<VerifyEmailResponse> => {
        const url = new URL('/api/auth/request-verification', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Failed to send verification code');
        return response.json();
    },

    // 인증 코드 확인
    verifyCode: async (params: { email: string; verificationToken: number; }): Promise<VerifyCodeResponse> => {
        const url = new URL(`/api/auth/verify-code/${params.verificationToken}`, baseUrl);
        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: params.email })
        });
        if (!response.ok) throw new Error('Failed to verify code');
        return response.json();
    },

    // 로그인
    signIn: async (data: {email: string, password: string}): Promise<ApiResponse<AuthResponse>> => {
        const url = new URL('/api/auth/signin', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to sign in');
        return response.json();
    },

    // 회원가입
    signUp: async (data: {email: string, password: string, verificationToken: number}): Promise<ApiResponse<AuthResponse>> => {
        const url = new URL('/api/auth/signup', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to sign up');
        return response.json();
    },

    // 소셜 로그인
    initialOAuth: async (provider: string): Promise<string> => {
        const url = new URL(`/api/auth/${provider}`, baseUrl);
        const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to initiate OAuth');

        const { url: redirectUrl } = await response.json();
        return redirectUrl;
    }
};