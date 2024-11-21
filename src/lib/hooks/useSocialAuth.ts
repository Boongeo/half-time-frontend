import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/auth";
import {useState} from "react";
import {authApi} from "@/lib/api/auth";

export function useSocialAuth() {
    const router = useRouter();
    const { signIn } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(true);
        try {
            // 1. 소셜 로그인 URL 요청
            const authUrl = await authApi.initialOAuth(provider);

            // 2. 팝업 설정
            const width = 500;
            const height = 600;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2;

            // 3. 팝업 열기
            const popup = window.open(
                authUrl,
                `${provider}Login`,
                `width=${width}, height=${height}, left=${left}, top=${top}`
            );

            // 4. 팝업 결과 모니터링
            if (popup) {
                const checkPopup = setInterval(() => {
                    try {
                        // 4-1. 팝업이 닫혔는지 확인
                        if (popup.closed) {
                            clearInterval(checkPopup);
                            setIsLoading(false);
                        }

                        // 4-2. 현재 URL이 callback URL인지 확인
                        const currentUrl = popup.location.href;
                        if (currentUrl.includes('/callback')) {
                            const urlParams = new URLSearchParams(
                                popup.location.search
                            );

                            const error = urlParams.get('error');
                            if (error) {
                                throw new Error(error);
                            }

                            const accessToken = urlParams.get('access_token');
                            const refreshToken = urlParams.get('refresh_token');

                            if (accessToken && refreshToken) {
                                signIn({ accessToken, refreshToken });
                                router.push('/');
                            }

                            clearInterval(checkPopup);
                            popup.close();
                            setIsLoading(false);
                        }
                    } catch (error) {
                        // cross-origin 에러는 무시
                        if (error instanceof DOMException) {
                            return;
                        }
                        console.error('Social Login Error', error);
                        clearInterval(checkPopup);
                        popup.close();
                        setIsLoading(false);
                    }
                }, 500);

                // 5분 후 자동 정리
                setTimeout(() => {
                    clearInterval(checkPopup);
                    if (!popup.closed) popup.close();
                    setIsLoading(false);
                }, 300000);
            }
        } catch (error) {
            console.error('Social Login Failed: ', error);
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleSocialLogin
    }
}