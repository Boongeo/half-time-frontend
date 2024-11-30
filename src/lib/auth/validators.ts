import {PasswordValidation} from "@/types/core/auth";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): PasswordValidation => {
    return {
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password)
    };
};

export const isPasswordValid = (validation: PasswordValidation): boolean => {
    return Object.values(validation).every(Boolean);
};

export const doPasswordsMatch = (password: string, passwordConfirm: string): boolean => {
    return password === passwordConfirm;
};