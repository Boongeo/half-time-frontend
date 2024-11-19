'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {authApi} from "@/lib/api/auth";
import {useAuthStore} from "@/store/auth";

interface LoginForm {
    email: string;
    password: string;
}

export function useLogin() {
    const router = useRouter();
    const { signIn } = useAuthStore();
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (email: string) => {
        setForm(prev => ({ ...prev, email }));
        setErrors({});
        setShowPassword(false);
    };

    const handlePasswordChange = (password: string) => {
        setForm(prev => ({ ...prev, password }));
        setErrors({});
    };

    const handleCheckEmail = async () => {
        if (!validateEmail(form.email)) {
            setErrors({ email: '유효한 이메일을 입력해주세요.' });
            return;
        }

        setIsLoading(true);
        try {
            const {exists} = await authApi.checkEmail(form.email);

            if (exists) {
                setShowPassword(true);
            } else {
                router.push(`/signup?email=${encodeURIComponent(form.email)}`);
            }
        } catch {
            setErrors({ email: '이메일 확인에 실패했습니다.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!form.password) {
            setErrors({ password: '비밀번호를 입력해주세요.' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.signIn(form);
            signIn(response.token, response.user);
            router.push('/');
        } catch {
            setErrors({ password: '로그인에 실패했습니다.' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        errors,
        showPassword,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        handleCheckEmail,
        handleLogin
    };
}
