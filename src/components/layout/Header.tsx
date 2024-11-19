import Image from "next/image";
import { Button } from "../common/Button";
import {useAuthStore} from "@/store/auth";
import Link from "next/link";

interface HeaderProps {
    showLoginButton?: boolean;
}

const Header = ({ showLoginButton = true }: HeaderProps) => {
    const { user, isAuthenticated, signOut } = useAuthStore();

    return (
        <header className="flex items-center justify-between p-8 bg-white">
            <Image
                src="/images/Logo.png"
                alt="Logo"
                width={150}
                height={50}
                priority
            />
            {showLoginButton && (
                <>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
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
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="primary" size="md">
                                Login
                            </Button>
                        </Link>
                    )}
                </>
            )}
        </header>
    );
};

export { Header, type HeaderProps };