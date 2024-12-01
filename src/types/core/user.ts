export type UserRole = 'user' | 'mentor' | 'admin';

export interface AuthResponseUser {
    id: string;
    email: string;
}

export interface User extends AuthResponseUser {
    name?: string;
    role?: UserRole;
    profileImage?: string;
    isProfileComplete?: boolean;
}

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    fetchUser: () => Promise<void>;
    updateProfile: (data: FormData | Partial<User>) => Promise<void>;
    setUser: (user: User | null) => void;
    reset: () => void;
}

export interface RegisterForm {
    nickname: string;
    interest: string;
    introduction: string;
    profileImage: string|null,
    profileFile?: File | null,
}