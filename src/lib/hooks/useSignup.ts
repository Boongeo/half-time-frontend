'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/api/auth";
import {useAuthStore} from "@/store/auth";
import {SignupForm, VerificationState} from "@/types/auth";

export function useSignup() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn } = useAuthStore();

    const [form, setForm] = useState<SignupForm>({
       email: '',
       verificationCode: '',
       password: '',
       passwordConfirm: ''
    });

    const [verification, setVerification] = useState<VerificationState>({
        verificationId: null,
        isCodeSent: false,
        isVerified: false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const email = searchParams.get('email');
        if (email) {
            setForm(prev => ({ ...prev, email }));
        }
    }, [searchParams]);

    const validatePassword = (password: string) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (!hasMinLength) return '비밀번호는 8자 이상이어야 합니다.';
        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
        }
        return null;
    };

    // 인증 코드 요청
    const handleRequestVerification = async () => {
        setIsLoading(true);
        try {
            const response = await authApi.requestVerification(form.email);
            setVerification(prev => ({
                ...prev,
                verificationId: response.verificationId,
                isCodeSent: true
            }));
        } catch {
            setErrors(prev => ({
                ...prev,
                email: '인증 코드 전송에 실패했습니다.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // 인증 코드 확인
    const handleVerifyCode = async () => {
        if (!verification.verificationId || !form.verificationCode) {
            setErrors(prev => ({
                ...prev,
                verificationCode: '인증 코드를 입력해주세요.'
            }));
            return;
        }

        setIsLoading(true);
        try {
            await authApi.verifyCode(verification.verificationId, form.verificationCode);
            setVerification(prev => ({
                ...prev,
                isVerified: true,
            }));
            setErrors(prev => ({ ...prev, verificationCode: '' }));
        } catch {
            setErrors(prev => ({
                ...prev,
                verificationCode: '잘못된 인증 코드입니다.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationCodeChange = (code: string) => {
        setForm(prev => ({ ...prev, verificationCode: code }));
        setErrors(prev => ({ ...prev, verificationCode: '' }));
    };

    const handlePasswordChange = (password: string) => {
        setForm(prev => ({ ...prev, password }));
        setErrors(prev => ({ ...prev, password: '' }));
    };

    const handlePasswordConfirmChange = (passwordConfirm: string) => {
        setForm(prev => ({ ...prev, passwordConfirm }));
        setErrors(prev => ({ ...prev, passwordConfirm: '' }));
    };

    const handleSignup = async () => {
        const errors: Partial<Record<keyof SignupForm, string>> = {};

        if (!verification.isVerified) {
            errors.verificationCode = '이메일 인증이 필요합니다.';
        }

        const passwordError = validatePassword(form.password);
        if (passwordError) {
            errors.password = passwordError;
        }

        if (form.password !== form.passwordConfirm) {
            errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.signUp({
                email: form.email,
                password: form.password
            });

            signIn(response.token, response.user);
            router.push('/register');
        } catch {
            setErrors({
                password: '회원가입에 실패했습니다.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        errors,
        verification,
        isLoading,
        handleRequestVerification,
        handleVerificationCodeChange,
        handleVerifyCode,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleSignup
    };
}