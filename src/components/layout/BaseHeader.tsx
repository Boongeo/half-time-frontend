import Link from "next/link";
import Image from "next/image";

export const BaseHeader = () => {
    return (
        <header className="flex items-center p-8 bg-white">
            <Link href="/">
                <Image
                    src="/images/Logo.png"
                    alt="Logo"
                    width={150}
                    height={50}
                    priority
                />
            </Link>
        </header>
    )
}