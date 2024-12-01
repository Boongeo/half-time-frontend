import {Check, X} from "lucide-react";
import {PasswordRequirementsProps} from "@/types/components/authProps";

export function PasswordRequirements({ validation }: PasswordRequirementsProps) {
    const requirements = [
        {
            label: '최소 8자 이상',
            isMet: validation.hasMinLength
        },
        {
            label: '대문자 1개 이상',
            isMet: validation.hasUpperCase
        },
        {
            label: '소문자 1개 이상',
            isMet: validation.hasLowerCase
        },
        {
            label: '숫자 1개 이상',
            isMet: validation.hasNumber
        }
    ];

    return (
        <ul className="text-sm space-y-1.5">
            {requirements.map(({ label, isMet }, index) => (
                <li
                    key={index}
                    className={`flex items-center gap-2 transition-colors ${
                        isMet ? 'text-green-500' : 'text-gray-500'
                    }`}
                >
                    {isMet ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <X className="w-4 h-4" />
                    )}
                    {label}
                </li>
            ))}
        </ul>
    );
}