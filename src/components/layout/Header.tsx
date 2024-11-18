import Image from "next/image";
import { Button } from "../common/Button";

interface HeaderProps {
    showLoginButton?: boolean;
}

const Header = ({ showLoginButton = true }: HeaderProps) => {
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
                <Button variant="primary" size="md">
                    Login
                </Button>
            )}
        </header>
    );
};

export { Header, type HeaderProps };