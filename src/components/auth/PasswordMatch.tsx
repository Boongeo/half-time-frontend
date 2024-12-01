import {PasswordMatchProps} from "@/types/components/featureProps";
import {Check, X} from "lucide-react";

export function PasswordMatch({ isMatching, show }: PasswordMatchProps) {
    if (!show) return null;

    return (
        <div className={`flex items-center gap-2 text-sm transition-colors ${
            isMatching ? 'text-green-500' : 'text-gray-500'
        }`}>
            {isMatching ? (
                <Check className="w-4 h-4" />
            ) : (
                <X className="w-4 h-4" />
            )}
            비밀번호 일치 여부
        </div>
    );
}