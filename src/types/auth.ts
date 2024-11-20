/** 사용자 기본 정보 */
export type UserRole = 'user' | 'mentor' | 'admin';

export interface AuthResponseUser {
    id: string;
    email: string;
}

export interface User extends AuthResponseUser {
    name?: string;
    role?: UserRole;
    profileImage?: string;
}

/** 상태 타입 */
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;

    setTokens: (accessToken: string, refreshToken: string) => void;
    signIn: (tokens: { accessToken: string, refreshToken: string }) => void;
    signOut: () => void;
}

export interface VerificationState {
    verificationToken: number | null;
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
    requireRegistration?: boolean;
}

/** JWT Payload 타입 */
export interface JwtPayload {
    sub: string;
    email: string;
    role?: UserRole;
    exp: number;
}