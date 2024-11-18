import Image from "next/image";
import { sideItems } from "@/config/sidebar";

export const Sidebar = () => {
    return (
        <nav className="fixed left-0 bg-[#FAFAFA] border-r px-2 pt-8 w-[80px] h-[calc(100vh-90px)] overflow-y-auto shadow-none">
            <div className="flex flex-col items-center space-y-12">
                {sideItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className="group flex flex-col items-center text-gray-700 hover:font-bold"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={20}
                            height={20}
                            className="transition duration-200 ease-in group-hover:brightness-150 group-hover:opacity-100"
                        />
                        <span className="text-xs mt-1">{item.name}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
};
