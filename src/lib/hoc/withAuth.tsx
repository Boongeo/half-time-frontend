'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from "@/store/user";
import {WithAuthProps} from "@/types/components/hocProps";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { requireAuth = false, requireUnauth = false, requireRegistration = false }: WithAuthProps = {}
) {
    return function WithAuthComponent(props: P) {
        const router = useRouter();
        const { isAuthenticated } = useAuthStore();
        const { user, isLoading, fetchUser } = useUserStore();

        useEffect(() => {
            if (isAuthenticated && !user && !isLoading) {
                fetchUser();
            }
        }, [isAuthenticated, user, isLoading, fetchUser]);

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

            // 인증 완료 & 로딩 완료 -> 추가 검사
            if (isAuthenticated && !isLoading) {
                // 추가 정보 입력 페이지 처리 (최초 가입 시에만 접근)
                if (requireRegistration) {
                    if (user?.name) {
                        router.push('/');
                        return;
                    }
                }
                // 추가 정보 입력이 필요한데 아직 입력하지 않은 경우
                else if (!user?.name && !requireRegistration) {
                    router.push('/register');
                    return;
                }
            }
        }, [isAuthenticated, user, isLoading, router]);

        if (requireAuth && isAuthenticated && isLoading) {
            return <div>Loading...</div>;
        }

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