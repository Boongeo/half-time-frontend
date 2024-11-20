'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/api/auth";
import {useAuthStore} from "@/store/auth";
import {SignupForm, VerificationState} from "@/types/auth";
import {validatePassword, validatePasswordConfirm} from "@/lib/auth/validators";

export function useSignup() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn } = useAuthStore();

    const [form, setForm] = useState<SignupForm>({
        email: '',
        verificationCode: '',
        password: '',
        passwordConfirm: '',
    });

    const [verification, setVerification] = useState<VerificationState>({
        verificationToken: null,
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

    // 인증 코드 요청
    const handleRequestVerification = async () => {
        setIsLoading(true);
        try {
            const response = await authApi.requestVerification(form.email);
            if (response.success) {
                setVerification(prev => ({
                    ...prev,
                    isCodeSent: true
                }));
            }
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
        if (!verification.verificationToken || !form.verificationCode) {
            setErrors(prev => ({
                ...prev,
                verificationCode: '인증 코드를 입력해주세요.'
            }));
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.verifyCode({
                email: form.email,
                verificationToken: verification.verificationToken
            });

            if (response.success && response.data.verified) {
                setVerification(prev => ({
                    ...prev,
                    isVerified: true,
                }));
                setErrors(prev => ({ ...prev, verificationCode: '' }));
            }
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

    // 회원가입
    const handleSignup = async () => {
        const errors: Partial<Record<keyof SignupForm, string>> = {};

        if (!verification.isVerified) {
            errors.verificationCode = '이메일 인증이 필요합니다.';
        }

        const passwordValidation = validatePassword(form.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.error!;
        }

        const passwordConfirmValidation = validatePasswordConfirm(form.password, form.passwordConfirm);
        if (!passwordConfirmValidation.isValid) {
            errors.passwordConfirm = passwordConfirmValidation.error!;
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.signUp({
                email: form.email,
                password: form.password,
                verificationToken: verification.verificationToken!
            });

            if (response.success) {
                signIn({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                });
                router.push('/register');
            }
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