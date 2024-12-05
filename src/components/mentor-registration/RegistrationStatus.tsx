import {useMentorRegistrationStore} from "@/store/mentor-registration";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import { RegistrationStatus as Status } from "@/types/core/mentor";
import {mentorRegistrationApi} from "@/lib/api/mentor-registration";
import {Button} from "@/components/common/Button";

interface Props {
    initialStatus?: Status;
}

export default function RegistrationStatus({ initialStatus }: Props) {
    const { registrationStatus, setRegistrationStatus } = useMentorRegistrationStore();
    const router = useRouter();

    useEffect(() => {
        if (initialStatus) {
            setRegistrationStatus(initialStatus);
        }

        const checkStatus = async () => {
            try {
                const response = await mentorRegistrationApi.checkStatus();
                if (response.success && response.data.status) {
                    setRegistrationStatus(response.data.status);
                }
            } catch (error) {
                console.error('상태 확인 실패: ', error);
            }
        };

        if (!initialStatus || initialStatus === 'pending') {
            const interval = setInterval(checkStatus, 60000);
            return () => clearInterval(interval);
        }
    }, [initialStatus, setRegistrationStatus]);

    if (!registrationStatus) return null;

    const getStatusContent = () => {
        switch (registrationStatus) {
            case 'pending':
                return {
                    title: '검토 중',
                    message: '멘토 등록 신청이 접수되었습니다. 관리자 검토 후 승인될 예정입니다. 검토는 영업일 기준 2-3일 정도 소요됩니다.',
                    className: 'bg-yellow-50 border-yellow-200',
                    titleColor: 'text-yellow-800',
                    messageColor: 'text-yellow-700'
                };
            case 'approved':
                return {
                    title: '승인 완료',
                    message: '축하드립니다! 멘토 등록이 승인되었습니다. 이제 멘토링을 시작할 수 있습니다.',
                    className: 'bg-green-50 border-green-200',
                    titleColor: 'text-green-800',
                    messageColor: 'text-green-700',
                    action: {
                        text: '멘토 대시보드로 이동',
                        onClick: () => router.push('/mentor/dashboard')
                    }
                };
            case 'rejected':
                return {
                    title: '승인 거절',
                    message: '멘토 등록이 거절되었습니다. 자세한 사유는 등록하신 이메일로 발송되었습니다. 추가 문의사항이 있으시다면 고객센터로 연락 부탁드립니다.',
                    className: 'bg-red-50 border-red-200',
                    titleColor: 'text-red-800',
                    messageColor: 'text-red-700',
                    action: {
                        text: '고객센터 문의하기',
                        onClick: () => router.push('/support')
                    }
                };
            default:
                return null;
        }
    };

    const content = getStatusContent();
    if (!content) return null;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">멘토 등록 상태</h2>
                <div className={`rounded-lg p-6 ${content.className}`}>
                    <h4 className={`text-lg font-semibold ${content.titleColor} mb-2`}>
                        {content.title}
                    </h4>
                    <p className={`${content.messageColor} mb-4`}>
                        {content.message}
                    </p>
                    {content.action && (
                        <Button
                            onClick={content.action.onClick}
                            variant={registrationStatus === 'approved' ? 'primary' : 'secondary'}
                        >
                            {content.action.text}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}