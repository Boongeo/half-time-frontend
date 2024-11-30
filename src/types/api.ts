import {Mentor} from "@/types/mentor";

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

export interface SearchResponse {
    mentors: Mentor[];
    total: number;
}