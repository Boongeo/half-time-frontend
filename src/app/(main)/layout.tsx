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
            <Header />
            <div className="flex-1 flex">
                {showSidebar && <Sidebar />}
                <main className={`flex-1 ${showSidebar ? 'ml-[240px]' : ''}`}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}