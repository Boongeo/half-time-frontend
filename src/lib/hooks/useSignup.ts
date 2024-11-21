'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/api/auth";
import {useAuthStore} from "@/store/auth";
import {PasswordValidation, SignupForm, VerificationState} from "@/types/auth";
import {doPasswordsMatch, isPasswordValid, validatePassword} from "@/lib/auth/validators";

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

    const [validation, setValidation] = useState<PasswordValidation>({
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false
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
        setValidation(validatePassword(password));

        setErrors(prev => ({
            ...prev,
            password: '',
            passwordConfirm: ''
        }));
    };

    const handlePasswordConfirmChange = (passwordConfirm: string) => {
        setForm(prev => ({ ...prev, passwordConfirm }));
        setErrors(prev => ({
            ...prev,
            passwordConfirm: ''
        }));
    };

    // 회원가입
    const handleSignup = async () => {
        const errors: Partial<Record<keyof SignupForm, string>> = {};

        if (!verification.isVerified) {
            errors.verificationCode = '이메일 인증이 필요합니다.';
        }

        if (!isPasswordValid(validation)) {
            errors.password = '비밀번호 조건을 모두 만족해주세요.';
        }

        if (!doPasswordsMatch(form.password, form.passwordConfirm)) {
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
        validation,
        isPasswordMatching: form.passwordConfirm ? doPasswordsMatch(form.password, form.passwordConfirm) : false,
        showPasswordMatch: !!form.passwordConfirm,
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