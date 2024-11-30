import {SocialLoginButtonProps} from "@/types/components/featureProps";
import {useSocialAuth} from "@/lib/hooks/useSocialAuth";
import {Button} from "@/components/common/Button";
import Image from "next/image";

export function SocialLoginButton({
    provider,
    icon: Icon,
    children
}: SocialLoginButtonProps) {
    const { isLoading, handleSocialLogin } = useSocialAuth();

    return (
        <Button
            type="button"
            variant="secondary"
            className="flex items-center justify-center gap-2"
            onClick={() => handleSocialLogin(provider.toLowerCase())}
            disabled={isLoading}
        >
            {typeof Icon === "string" ? (
                <Image src={Icon} alt={provider} width={20} height={20} />
            ) : (
                <Icon size={20} />
            )}
            {children}
        </Button>
    );
}