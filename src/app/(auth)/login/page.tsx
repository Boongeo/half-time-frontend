'use client';

import Image from "next/image";
import {socialLogin} from "@/config/login";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";

export default function LoginPage() {
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
                        onClick={() => {
                        }}
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
                    <span className="bg-white px-2 text-muted-foreground">
                       Or continue with
                    </span>
                </div>
            </div>

            {/* 로컬 로그인 섹션 */}
            <form className="flex flex-col w-full max-w-sm gap-4">
                <div className="flex gap-2">
                    <div className="w-[70%]">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-[30%] whitespace-nowrap"
                        onClick={() => {
                        }}
                    >
                        Verify email
                    </Button>
                </div>
                <Input
                    type="password"
                    placeholder="Enter password"
                />
                <Button type="submit" className="w-full">
                    Sign in / Sign up
                </Button>
            </form>
        </div>
    );
}