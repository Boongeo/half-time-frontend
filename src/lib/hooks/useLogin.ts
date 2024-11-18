'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {authApi} from "@/lib/api/auth";

interface LoginForm {
    password: string;
    email: string;
}

export function useLogin() {
    const router = useRouter();
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<keyof LoginForm, string>>({
        email: '',
        password: ''
    });
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const handleEmailChange = (email: string) => {
        setForm(prev => ({ ...prev, email }));
        setErrors(prev => ({ ...prev, email: '' }));
        setIsEmailVerified(false);
    };

    const handlePasswordChange = (password: string) => {
        setForm(prev => ({ ...prev, password }));
        setErrors(prev => ({ ...prev, password: '' }));
    };

    const handleVerifyEmail = async () => {
        if (!validateEmail(form.email)) {
            setErrors(prev => ({ ...prev, email: '유효한 이메일을 입력해주세요.' }));
            return;
        }

        setIsLoading(true);
        try {
            await authApi.verifyEmail(form.email);
            setIsEmailVerified(true);
        } catch {
            setErrors(prev => ({ ...prev, email: '이메일 인증에 실패했습니다.' }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!isEmailVerified) {
            setErrors(prev => ({ ...prev, email: '이메일 인증이 필요합니다.' }));
            return;
        }

        if (!validatePassword(form.password)) {
            setErrors(prev => ({ ...prev, password: '비밀번호는 8자 이상이어야 합니다.' }));
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.signInOrSignUp(form);
            if (response.user.isNewUser) {
                router.push('/auth/register');
            } else {
                router.push('/');
            }
        } catch {
            setErrors(prev => ({
                ...prev,
                password: '로그인에 실패했습니다.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        errors,
        isEmailVerified,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        handleVerifyEmail,
        handleSubmit
    };
}
