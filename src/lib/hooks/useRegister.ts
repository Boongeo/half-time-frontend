'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/lib/api/user";

interface RegisterForm {
    nickname: string;
    interest: string;
    introduction: string;
    profileImage: string|null,
    profileFile?: File | null,
}

export function useRegister() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterForm>({
        nickname: "",
        interest: "",
        introduction: "",
        profileImage: null,
        profileFile: null,
    });

    // 상태 업데이트 함수
    const updateField = (field: keyof RegisterForm, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // 프로필 이미지 업데이트 함수
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB!");
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setForm((prev) => ({
                        ...prev,
                        profileImage: reader.result as string,
                        profileFile: file// 이미지 파일을 상태에 저장
                    }));
                };
                reader.readAsDataURL(file); // 파일을 Base64 URL로 변환
            }
        }
    };

    // FormData로 서버로 전송하는 함수
    const submitForm = async () => {
        if (form.nickname && form.interest && form.introduction) {
            const formData = new FormData();
            formData.append("nickname", form.nickname);
            formData.append("interest", form.interest);
            formData.append("introduction", form.introduction);

            if (form.profileFile) {
                formData.append("profileImage", form.profileFile);
            }

            try {
                await userApi.register(formData);
                alert("프로필이 정상적으로 등록되었습니다.");
                router.push('/');
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        } else {
            alert("모든 필드를 입력해주세요.");
        }
    };

    return {
        form,
        updateField,
        submitForm,
        handleImageChange
    };
}
