import { Session, MenteeApplication } from "@/types/core/mentoring";
import {X, Clock, CheckCircle, XCircle, User, CalendarDays} from "lucide-react";
import { Button } from "@/components/common/Button";

interface ApplicationListProps {
    session: Session;
    applications: MenteeApplication[];
    onClose: () => void;
    onApprove?: (applicationId: number) => void;
    onReject?: (applicationId: number) => void;
}

export function ApplicationList({
    session,
    applications,
    onClose,
    onApprove,
    onReject
}: ApplicationListProps) {
    const approvedApplications = applications.filter(app => app.status === 'approved');

    const getTimeSlotApplications = (date: string, time: string) => {
        return applications.filter(app =>
            app.preferredDate === date &&
            app.preferredTime === time &&
            (app.status === 'approved' || app.status === 'pending')
        );
    };

    const formatSessionTime = (time: string, duration: number) => {
        const [hours, minutes] = time.split(':').map(Number);
        const endTime = new Date(2024, 0, 1, hours, minutes + duration);
        return `${time}~${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">세션 상세</h2>
                    <p className="text-gray-500">멘티 신청 목록</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5"/>
                </button>
            </div>

            {/* 세션 시간 정보 섹션 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-700">
                    <CalendarDays className="w-4 h-4"/>
                    <h3 className="font-medium text-sm mt-1">예약 가능 시간</h3>
                </div>
                <div className="space-y-2">
                    {session.availableTime.map((schedule) => (
                        <div key={schedule.day} className="flex items-center gap-2">
                            <span className="ml-1 w-6 font-medium text-gray-600">{schedule.day}</span>
                            <div className="flex flex-wrap gap-2">
                                {schedule.times.map((time) => (
                                    <span
                                        key={time}
                                        className="px-2 py-1 bg-white rounded text-sm text-gray-600 border"
                                    >
                                        {formatSessionTime(time, schedule.duration)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {session.type === 'group' && (
                <p className="text-sm text-gray-500 mb-4">
                    {approvedApplications.length}/{session.maxParticipants}명 참여중
                </p>
            )}

            <div className="space-y-4">
                {applications.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg hover:border-blue-200">
                        <div className="flex items-center gap-3 mb-3 text-gray-600">
                            {application.mentee.profileImage ? (
                                <img
                                    src={application.mentee.profileImage}
                                    alt={application.mentee.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-gray-500"/>
                                </div>
                            )}
                            <div>
                                <h4 className="font-medium">{application.mentee.name}</h4>
                                <p className="text-sm text-gray-500">{application.mentee.interest}</p>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4"/>
                                    <span>
                                        희망일시: {new Date(application.preferredDate).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} {application.preferredTime}
                                    </span>
                                </div>
                                {session.type === 'group' && (
                                    <div className="text-xs text-gray-500 ml-6">
                                        {`같은 시간대 신청자: ${getTimeSlotApplications(
                                            application.preferredDate,
                                            application.preferredTime
                                        ).length}명`}
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">{application.message}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    application.paymentStatus === 'paid'
                                        ? 'bg-green-50 text-green-600'
                                        : application.paymentStatus === 'pending'
                                            ? 'bg-yellow-50 text-yellow-600'
                                            : application.paymentStatus === 'refunded'
                                                ? 'bg-gray-50 text-gray-600'
                                                : 'bg-red-50 text-red-600'
                                }`}>
                                    {application.paymentStatus === 'paid' && '결제완료'}
                                    {application.paymentStatus === 'pending' && '결제대기'}
                                    {application.paymentStatus === 'refunded' && '환불됨'}
                                    {application.paymentStatus === 'failed' && '결제실패'}
                                </span>
                                {application.status === 'rejected' && application.cancelReason && (
                                    <span className="text-xs text-red-500">
                                        {application.cancelReason}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {application.status === 'pending' ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onReject?.(application.id)}
                                    >
                                        <XCircle className="w-4 h-4 mr-1"/>
                                        거절
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onApprove?.(application.id)}
                                        disabled={session.type === 'group' &&
                                            approvedApplications.length >= (session.maxParticipants as number)}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1"/>
                                        수락
                                    </Button>
                                </>
                            ) : (
                                <div className={`w-full px-3 py-2 rounded text-sm text-center ${
                                    application.status === 'approved'
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                    {application.status === 'approved' ? '승인됨' : '거절됨'}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        아직 신청한 멘티가 없습니다
                    </div>
                )}
            </div>

            {session.type === 'group' && (
                <div className="mt-6 pt-6 border-t">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">그룹 멘토링 현황</h3>
                        <div className="flex justify-between items-center text-blue-600">
                            <span>현재 참여 인원</span>
                            <span className="font-medium">
                                {approvedApplications.length}/{session.maxParticipants}명
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}