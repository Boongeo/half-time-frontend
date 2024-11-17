// components/common/Header.tsx
import Image from "next/image";
import { Button } from "../common/Button"; // Button 컴포넌트 import

export const Header = () => {
    return (
        <header className="flex items-center justify-between p-8 bg-white">
            <Image
                src="/images/Logo.png"
                alt="Logo"
                width={150}
                height={50}
                priority
            />
            <Button
                variant="primary"
                size="md"
            > Login
            </Button>
        </header>
    );
};
