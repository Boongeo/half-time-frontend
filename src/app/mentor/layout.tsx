'use client'

import {Footer} from "@/components/layout/Footer";
import {usePathname} from 'next/navigation';
import {Header} from "@/components/layout/Header";
import {Sidebar} from "@/components/layout/Sidebar";
import {cn} from "@/lib/utils/cn";

export default function MentorRegistrationLayout({ children, }: { children: React.ReactNode; }) {
    const pathname = usePathname();
    const showSidebar = !pathname.startsWith('/mentor/registration') && !pathname.startsWith('/mentor/status');

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header/>
            </div>
            <div className="flex-1 flex pt-[90px]">
                {showSidebar && (
                    <aside className="fixed left-0 w-[80px] h-full -mt-[2px]">
                        <Sidebar/>
                    </aside>
                )}
                <main className={cn(
                    "flex-1 container mx-auto px-4 py-8",
                    showSidebar ? "ml-[80px]" : ""
                )}>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
}