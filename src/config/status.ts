import {Check, Clock, XCircle} from "lucide-react";
import {RegistrationStatus, StatusConfig} from "@/types/core/mentor";

export const mentorStatusConfig: Record<RegistrationStatus, StatusConfig> = {
    pending: {
        icon: Clock,
        title: '멘토 신청 검토 중',
        description: '멘토 등록 신청이 접수되었습니다. 관리자 검토 후 승인될 예정입니다.\n검토는 영업일 기준 2-3일 정도 소요됩니다.',
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    approved: {
        icon: Check,
        title: '멘토 승인 완료',
        description: '축하드립니다! 멘토 등록이 승인되었습니다.\n이제 멘토링을 시작할 수 있습니다.',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        action: {
            text: '대시보드로 이동',
            href: '/mentor/dashboard'
        }
    },
    rejected: {
        icon: XCircle,
        title: '멘토 승인 거절',
        description: '멘토 등록이 거절되었습니다.\n자세한 사유는 등록하신 이메일로 발송되었습니다. 추가 문의사항이 있으시다면 고객센터로 연락 부탁드립니다.',
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        action: {
            text: '고객센터 문의하기',
            href: '/support'
        }
    }
};
