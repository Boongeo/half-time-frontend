// Layout.tsx
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main className="ml-[112px] flex-1 p-4">{children}</main>
            </div>

            <Footer />
        </div>
    );
};

