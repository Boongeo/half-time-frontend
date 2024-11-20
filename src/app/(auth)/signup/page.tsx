'use client'

import Image from "next/image";
import {socialLogin} from "@/config/login";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";
import {useSignup} from "@/lib/hooks/useSignup";
import {CheckCircle, Mail} from "lucide-react";
import {withAuth} from "@/lib/auth/withAuth";

function SignupPage() {
    const {
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
    } = useSignup();

    const getErrorProps = (field: keyof typeof errors) => ({
        error: !!errors[field],
        helperText: errors[field]
    });

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center space-y-2 mb-4 text-themeColor">
                <h2 className="text-2xl font-semibold">Welcome to Half Time</h2>
                <p className="text-muted-foreground">
                    Connect, learn, and grow with developers
                </p>
            </div>

            {/* 소셜 로그인 섹션 */}
            <div className="flex flex-col w-full max-w-sm gap-4">
                {socialLogin.map((social) => (
                    <Button
                        key={social.id}
                        className="flex items-center justify-center gap-2"
                        variant="secondary"
                        onClick={() => {}}
                    >
                        {typeof social.icon === "string" ? (
                            <Image src={social.icon} alt={social.name} width={20} height={20}/>
                        ) : (
                            <social.icon size={20}/>
                        )}
                        Continue with {social.name}
                    </Button>
                ))}
            </div>

            {/* 구분선 */}
            <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground text-gray-500">
                       Or continue with
                    </span>
                </div>
            </div>

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
                                    <Mail className="w-4 h-4" />
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
                                        <CheckCircle className="w-4 h-4" />
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
                        <Input
                            type="password"
                            placeholder="Create password"
                            value={form.password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            {...getErrorProps('password')}
                        />

                        <Input
                            type="password"
                            placeholder="Confirm password"
                            value={form.passwordConfirm}
                            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                            {...getErrorProps('passwordConfirm')}
                        />

                        {/* Password Requirements */}
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>비밀번호는 다음을 포함해야 합니다:</p>
                            <ul className="list-disc pl-4 space-y-0.5">
                                <li>최소 8자 이상</li>
                                <li>대문자 1개 이상</li>
                                <li>소문자 1개 이상</li>
                                <li>숫자 1개 이상</li>
                            </ul>
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

export default withAuth(SignupPage, { requireUnauth: true });