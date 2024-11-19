'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface WithAuthProps {
    requireAuth?: boolean;
    requireUnauth?: boolean;
}

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { requireAuth = false, requireUnauth = false }: WithAuthProps = {}
) {
    return function WithAuthComponent(props: P) {
        const router = useRouter();
        const { isAuthenticated, isLoading } = useAuthStore();

        useEffect(() => {
            if (isLoading) return;

            if (requireAuth && !isAuthenticated) {
                router.push('/login');
            } else if (requireUnauth && isAuthenticated) {
                router.push('/');
            }
        }, [isAuthenticated, isLoading, router]);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (requireAuth && !isAuthenticated) {
            return null;
        }

        if (requireUnauth && isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}