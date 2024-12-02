import {useAuthStore} from "@/store/auth";
import {useEffect, useState} from "react";
import {User} from "@/types/core/user";
import {userApi} from "@/lib/api/user";

export function useAuth() {
    const { accessToken, isAuthenticated } = useAuthStore();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (isAuthenticated && accessToken) {
                try {
                    const response = await userApi.getMe();  // 현재 사용자 정보 조회
                    if (response.success) {
                        setUser(response.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user role:', error);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        }

        fetchUser();
    }, [isAuthenticated, accessToken]);

    return {
        user,
        isAuthenticated,
        isLoading,
        role: user?.role || null
    };
}