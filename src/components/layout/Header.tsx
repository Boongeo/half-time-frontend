'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "../common/Button";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";

export const Header = () => {
    const { isAuthenticated, signOut } = useAuthStore();
    const { user } = useUserStore();

    return (
        <header className="flex items-center justify-between p-8 bg-white">
            <Link href="/">
                <Image
                    src="/images/Logo.png"
                    alt="Logo"
                    width={150}
                    height={50}
                    priority
                />
            </Link>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-sm text-gray-600">
                            {user?.email}
                        </span>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={signOut}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link href="/login">
                        <Button variant="primary" size="md">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};