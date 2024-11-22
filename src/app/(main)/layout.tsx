'use client'

import { usePathname } from 'next/navigation'
import {Header} from "@/components/layout/Header";
import {Sidebar} from "@/components/layout/Sidebar";
import {Footer} from "@/components/layout/Footer";

export default function MainLayout({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const showSidebar = pathname !== '/'

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header/>
            </div>
            <div className="flex-1 flex pt-[90px]">
                {showSidebar && (
                    <aside className="fixed left-0 w-[80px] h-full -mt-[2px]">
                        <Sidebar/>
                    </aside>
                )}
                <main className={`flex-1 ${showSidebar ? 'pl-[80px]' : ''}`}>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )
}