import {useState} from "react";
import {MentorRegistration, RegistrationStatus} from "@/types/core/mentor";
import {mentorRegistrationApi} from "@/lib/api/mentor-registration";
import { Button } from "../common/Button";
import RejectModal from "@/components/admin/MentorRejectModal";

interface Props {
    initialRegistrations: MentorRegistration[];
}

export default function MentorRegistrationManagement({ initialRegistrations }: Props) {
    const [registrations, setRegistrations] = useState(initialRegistrations);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async (registration: MentorRegistration) => {
        if (!confirm('해당 멘토 등록을 승인하시겠습니까?')) return;

        setIsLoading(true);
        try {
            const response = await mentorRegistrationApi.approve(registration.id);
            if (response.success) {
                setRegistrations(prev =>
                    prev.map(reg =>
                        reg.id === registration.id
                            ? { ...reg, status: 'approved' as RegistrationStatus }
                            : reg
                    )
                );
            }
        } catch (error) {
            console.error('멘토 승인 실패:', error);
            alert('멘토 승인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async (registrationId: number, reason: string) => {
        setIsLoading(true);
        try {
            const response = await mentorRegistrationApi.reject(registrationId, reason);
            if (response.success) {
                setRegistrations(prev =>
                    prev.map(reg =>
                        reg.id === registrationId
                            ? { ...reg, status: 'rejected' as RegistrationStatus }
                            : reg
                    )
                );
            }
        } catch (error) {
            console.error('멘토 거절 실패:', error);
            alert('멘토 거절에 실패했습니다.');
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
            setSelectedId(null);
        }
    };

    const getStatusBadge = (status: RegistrationStatus) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };

        const labels = {
            pending: '검토중',
            approved: '승인됨',
            rejected: '거절됨'
        };

        return (
            <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">멘토 등록 관리</h2>

            {/* 등록 신청 목록 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신청자
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            회사/경력
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            기술 스택
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신청일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((registration) => (
                        <tr key={registration.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {registration.user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {registration.user.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {registration.company}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {registration.experience}년차
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {registration.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                                        >
                                                {tech}
                                            </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(registration.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(registration.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {registration.status === 'pending' && (
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() => handleApprove(registration)}
                                            variant="primary"
                                            size="sm"
                                            disabled={isLoading}
                                        >
                                            승인
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setSelectedId(registration.id);
                                                setIsModalOpen(true);
                                            }}
                                            variant="primary"
                                            size="sm"
                                            disabled={isLoading}
                                        >
                                            거절
                                        </Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 거절 사유 입력 모달 */}
            {selectedId && (
                <RejectModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedId(null);
                    }}
                    registrationId={selectedId}
                    onConfirm={(reason) => handleReject(selectedId, reason)}
                />
            )}
        </div>
    );
}