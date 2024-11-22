'use client'

import { sideItems } from "@/config/sidebar";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils/cn";

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed left-0 bg-white border-r px-2 pt-8 w-[80px] h-full overflow-y-auto shadow-none">
            <div className="flex flex-col items-center space-y-12">
                {sideItems.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center",
                                "group",
                            )}
                        >
                            <div className={cn(
                                "text-gray-500 group-hover:text-gray-900",
                                isActive && "text-gray-900",
                                "transition-colors duration-200"
                            )}>
                                <IconComponent
                                    className={cn(
                                        "w-5 h-5",
                                        "transition-[stroke-width] duration-200",
                                        isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "text-xs mt-1",
                                "text-gray-500 group-hover:text-gray-900",
                                isActive && "text-gray-900 font-semibold",
                                "transition-colors duration-200"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    )
        ;
};
