'use client'

import {socialLogin} from "@/config/login";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";
import {useLogin} from "@/lib/hooks/useLogin";
import {withAuth} from "@/lib/auth/withAuth";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";

function LoginPage() {
    const {
        form,
        errors,
        showPassword,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        handleCheckEmail,
        handleLogin
    } = useLogin();

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

            {/* 로컬 로그인 섹션 */}
            <form onSubmit={(e) => {
                e.preventDefault();
                if (showPassword) {
                    handleLogin();
                } else {
                    handleCheckEmail();
                }
            }} className="flex flex-col w-full max-w-sm gap-4">

                {/* Email Input */}
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    value={form.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    disabled={showPassword}
                    {...getErrorProps('email')}
                />

                {/* Password Input (조건부 렌더링) */}
                {showPassword && (
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        {...getErrorProps('password')}
                    />
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {showPassword ? "Sign in" : "Continue"}
                </Button>
            </form>
        </div>
    );
}

export default withAuth(LoginPage, { requireUnauth: true });