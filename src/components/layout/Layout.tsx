import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="fixed top-0 w-full z-50 h-[90px]">
                <Header />
            </div>

            <div className="flex pt-[90px]">
                <Sidebar />
                <main className="flex-1 ml-[80px] p-4 min-h-[calc(100vh-90px)]">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
};