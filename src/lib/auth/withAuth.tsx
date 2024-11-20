'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { WithAuthProps } from "@/types/auth";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { requireAuth = false, requireUnauth = false, requireRegistration = false }: WithAuthProps = {}
) {
    return function WithAuthComponent(props: P) {
        const router = useRouter();
        const { isAuthenticated, user } = useAuthStore();

        useEffect(() => {
            // 미인증 사용자 처리
            if (requireAuth && !isAuthenticated) {
                router.push('/login');
                return;
            }

            // 인증 사용자 처리
            if (requireUnauth && isAuthenticated) {
                router.push('/');
                return;
            }

            // 추가 정보 입력 페이지 처리 (최초 가입 시에만 접근)
            if (requireRegistration) {
                if (!isAuthenticated) {
                    router.push('/login');
                    return;
                }
                if (user?.name) {
                    router.push('/');
                    return;
                }
            }

            if (isAuthenticated && !user?.name && !requireRegistration) {
                router.push('/register');
                return;
            }
        }, [isAuthenticated, user, router]);

        if (requireAuth && !isAuthenticated) {
            return null;
        }

        if (requireUnauth && isAuthenticated) {
            return null;
        }

        if (requireRegistration && user?.name) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}