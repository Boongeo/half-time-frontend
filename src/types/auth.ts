/** 사용자 기본 정보 */
export interface AuthResponseUser {
    id: string;
    email: string;
}

export interface User extends AuthResponseUser {
    name?: string;
    role?: 'user' | 'mentor' | 'admin';
    profileImage?: string;
}

/** 상태 타입 */
export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;

    setTokens: (accessToken: string, refreshToken: string) => void;
    signIn: (tokens: { accessToken: string, refreshToken: string }) => void;
    signOut: () => void;
}

export interface VerificationState {
    verificationToken: string | null;
    isCodeSent: boolean;
    isVerified: boolean;
}

/** 폼 데이터 타입 */
export interface LoginForm {
    email: string;
    password: string;
}

export interface SignupForm {
    email: string;
    verificationCode: string;
    password: string;
    passwordConfirm: string;
}

/** API 응답 타입 */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export type CheckEmailResponse = ApiResponse<{ exists: boolean }>
export type VerifyEmailResponse = ApiResponse<{ email: string; }>
export type VerifyCodeResponse = ApiResponse<{ verified: boolean }>

/** HOC props */
export interface WithAuthProps {
    requireAuth?: boolean;
    requireUnauth?: boolean;
}