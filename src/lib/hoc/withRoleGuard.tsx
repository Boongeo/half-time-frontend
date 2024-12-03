import {UserRole} from "@/types/core/user";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/hooks/useAuth";
import {useEffect} from "react";

export function withRoleGuard<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    allowedRoles: UserRole[]
) {
    return function RoleGuardComponent(props: P) {
        const router = useRouter();
        const { isAuthenticated, role, isLoading } = useAuth();

        useEffect(() => {
            if (!isLoading && (!isAuthenticated || !role || !allowedRoles.includes(role))) {
                const redirectPath = !isAuthenticated ? '/login' : '/signup';
                router.replace(redirectPath);
            }
        }, [isAuthenticated, role, isLoading, router]);

        if (isLoading) {
            return <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Loading...</div>
            </div>;
        }

        if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}