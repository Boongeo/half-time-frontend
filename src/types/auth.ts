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

/** 인증 상태 스토어 타입 */
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    signIn: (token: string, user: User) => void;
    signOut: () => void;
    updateUser: (userData: Partial<User>) => void;
    clearError: () => void;
}

/** 로그인 폼 데이터 */
export interface LoginForm {
    email: string;
    password: string;
}

/** 회원가입 폼 데이터 */
export interface SignupForm {
    email: string;
    verificationCode: string;
    password: string;
    passwordConfirm: string;
}

/** 이메일 인증 상태 */
export interface VerificationState {
    verificationId: string | null;
    isCodeSent: boolean;
    isVerified: boolean;
}

/** API 응답 타입들 */
export interface AuthResponse {
    token: string;
    user: AuthResponseUser;
}

export interface CheckEmailResponse {
    exists: boolean;
}

export interface VerifyEmailResponse {
    success: boolean;
    verificationId: string;
}

export interface VerifyCodeResponse {
    success: boolean;
}

/** HOC props */
export interface WithAuthProps {
    requireAuth?: boolean;
    requireUnauth?: boolean;
}