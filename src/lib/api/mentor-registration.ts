import {ApiResponse, MentorRegistrationResponse} from "@/types/api";

export const mentorRegistrationApi = {
    // 멘토 등록
    register: async (formData: FormData): Promise<ApiResponse<MentorRegistrationResponse>> => {
        const response = await fetch('/api/mentor-registration', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to register");
        return response.json();
    },

    // 이메일 중복 확인
    checkEmail: async (email: string): Promise<ApiResponse<{ exists: boolean }>> => {
        const response = await fetch(`/api/mentor-registration/check-email?email=${encodeURIComponent(email)}`);

        if (!response.ok) throw new Error("Failed to check email");
        return response.json();
    },

    // 경력 증명서 업로드
    uploadCareerProof: async (file: File): Promise<ApiResponse<{ fileUrl: string }>> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/mentor-registration/upload-career-proof', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload file");
        return response.json();
    }
}