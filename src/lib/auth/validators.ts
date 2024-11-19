export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): {
    isValid: boolean;
    error: string | null;
} => {
    if (!password) {
        return {
            isValid: false,
            error: '비밀번호를 입력해주세요.'
        };
    }

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasMinLength) {
        return {
            isValid: false,
            error: '비밀번호는 8자 이상이어야 합니다.'
        };
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return {
            isValid: false,
            error: '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

export const validatePasswordConfirm = (password: string, passwordConfirm: string): {
    isValid: boolean;
    error: string | null;
} => {
    if (password !== passwordConfirm) {
        return {
            isValid: false,
            error: '비밀번호가 일치하지 않습니다.'
        };
    }

    return {
        isValid: true,
        error: null
    };
};