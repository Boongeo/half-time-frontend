import {Footer} from "@/components/layout/Footer";
import {BaseHeader} from "@/components/layout/BaseHeader";

export default function AuthLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <BaseHeader />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}