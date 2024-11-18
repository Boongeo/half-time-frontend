// Sidebar.tsx
import Image from "next/image";
import { sideItems } from "@/config/sidebar";

export const Sidebar = () => {
    return (
        <nav className="bg-[#FAFAFA] border-b px-4 pt-12 w-32 fixed left-0 top-24 h-[calc(100vh-12rem)] overflow-y-auto shadow-none">
            <div className="flex flex-col items-center space-y-16">
                {sideItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className="group flex flex-col items-center text-gray-700 hover:font-bold"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={24}
                            height={24}
                            className="transition duration-200 ease-in group-hover:brightness-150 group-hover:opacity-100"
                        />
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
};
