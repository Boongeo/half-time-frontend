import {Header} from "@/components/layout/Header";
import {Sidebar} from "@/components/layout/Sidebar";
import {Footer} from "@/components/layout/Footer";

export default function MainLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <div className="flex-1 flex">
                <Sidebar/>
                <main className="flex-1 container mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
}