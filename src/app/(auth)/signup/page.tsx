'use client'

import {socialLogin} from "@/config/login";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";
import {useSignup} from "@/lib/hooks/useSignup";
import {CheckCircle, Mail} from "lucide-react";
import {withAuth} from "@/lib/auth/withAuth";
import {SocialLoginButton} from "@/components/auth/SocialLoginButton";
import {AuthDivider} from "@/components/auth/AuthDivider";
import {AuthHeader} from "@/components/auth/AuthHeader";
import {PasswordRequirements} from "@/components/auth/PasswordRequirements";
import {PasswordMatch} from "@/components/auth/PasswordMatch";

function SignupPage() {
    const {
        form,
        errors,
        verification,
        isLoading,
        validation,
        isPasswordMatching,
        showPasswordMatch,
        handleRequestVerification,
        handleVerificationCodeChange,
        handleVerifyCode,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleSignup
    } = useSignup();

    const getErrorProps = (field: keyof typeof errors) => ({
        error: !!errors[field],
        helperText: errors[field]
    });

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <AuthHeader />

            {/* 소셜 로그인 섹션 */}
            <div className="flex flex-col w-full max-w-sm gap-4">
                {socialLogin.map((social) => (
                    <SocialLoginButton
                        key={social.id}
                        provider={social.id}
                        icon={social.icon}
                    >
                        Continue with {social.name}
                    </SocialLoginButton>
                ))}
            </div>

            {/* 구분선 */}
            <AuthDivider />

            {/* 회원가입 폼 */}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
            }} className="flex flex-col w-full max-w-sm gap-4">

                {/* Email Input */}
                <div className="space-y-2">
                    <div className="flex gap-2 w-full">
                        <div className="flex-grow">
                            <Input
                                type="email"
                                className="w-full"
                                value={form.email}
                                disabled
                                {...getErrorProps('email')}
                            />
                        </div>
                        <Button
                            type="button"
                            variant={verification.isCodeSent ? "primary" : "outline"}
                            className="whitespace-nowrap min-w-[120px]"
                            onClick={handleRequestVerification}
                            disabled={verification.isVerified || isLoading}
                        >
                            {verification.isCodeSent ? (
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4"/>
                                    Resend
                                </span>
                            ) : "Send Code"}
                        </Button>
                    </div>

                    {/* Verify Code Input */}
                    {verification.isCodeSent && !verification.isVerified && (
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Enter verification code"
                                value={form.verificationCode}
                                onChange={(e) => handleVerificationCodeChange(e.target.value)}
                                maxLength={6}
                                className="w-full"
                                disabled={verification.isVerified}
                                {...getErrorProps('verificationCode')}
                            />
                            <Button
                                type="button"
                                onClick={handleVerifyCode}
                                disabled={isLoading || verification.isVerified}
                                className="whitespace-nowrap min-w-[120px]"
                            >
                                {verification.isVerified ? (
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4"/>
                                        Verified
                                    </span>
                                ) : "Verify"}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Password Input (이메일 인증 완료 후에만 표시) */}
                {verification.isVerified && (
                    <>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Create password"
                                value={form.password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                {...getErrorProps('password')}
                            />
                            <PasswordRequirements validation={validation} />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                value={form.passwordConfirm}
                                onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                                {...getErrorProps('passwordConfirm')}
                            />
                            <PasswordMatch
                                isMatching={isPasswordMatching}
                                show={showPasswordMatch}
                            />
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !verification.isVerified}
                >
                    Create Account
                </Button>
            </form>
        </div>
    );
}

export default withAuth(SignupPage, {requireUnauth: true});