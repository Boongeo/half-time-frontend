import {AuthResponse} from "@/types/api";

/** 상태 타입 */
export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    userId: string | null;
    email: string | null;

    setTokens: (accessToken: string, refreshToken: string) => void;
    signIn: (tokens: AuthResponse) => void;
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

/** Password 검증 */
export interface PasswordValidation {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
}

/** JWT Payload 타입 */
export interface JwtPayload {
    sub: string;
    exp: number;
}