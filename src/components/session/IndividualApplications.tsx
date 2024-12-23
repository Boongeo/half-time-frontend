import { CalendarDays, Clock, CheckCircle, XCircle, User } from "lucide-react";
import { Button } from "@/components/common/Button";
import _ from "lodash";
import {ApplicationListProps} from "@/types/components/sessionProps";

export function IndividualApplications({
   session,
   applications,
   onApprove,
   onReject
}: Omit<ApplicationListProps, 'onClose'>) {
    const dateGroups = _.groupBy(applications, app => app.preferredDate);

    const addMinutesToTime = (time: string, duration: number) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + duration;
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6 text-gray-600">
            {Object.entries(dateGroups).sort().map(([date, dateApplications]) => (
                <div key={date} className="border rounded-lg overflow-hidden">
                    {/* 날짜 헤더 */}
                    <div className="bg-gray-50 p-4 border-b">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-gray-500"/>
                            <span className="font-medium">
                                {new Date(date).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    weekday: 'short'
                                })}
                            </span>
                            <span className="text-sm text-gray-500">
                                ({dateApplications.length}건)
                            </span>
                        </div>
                    </div>

                    {/* 신청 목록 */}
                    <div className="divide-y">
                        {dateApplications.map((application) => (
                            <div key={application.id} className="p-4 hover:bg-gray-50">
                                {/* 신청자 기본 정보 */}
                                <div className="flex items-center gap-3 mb-3">
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
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium">{application.mentee.name}</h4>
                                                <p className="text-sm text-gray-500">{application.mentee.interest}</p>
                                            </div>
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
                                        </div>
                                    </div>
                                </div>

                                {/* 신청 상세 정보 */}
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 ml-11">{application.message}</p>
                                    {application.status === 'rejected' && application.cancelReason && (
                                        <p className="text-sm text-red-500 ml-11">
                                            거절 사유: {application.cancelReason}
                                        </p>
                                    )}
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-1 ml-11">
                                            <Clock className="w-4 h-4 text-gray-400"/>
                                            <span className="text-sm">
                                                {application.preferredTime} ~ {
                                                addMinutesToTime(
                                                    application.preferredTime,
                                                    session.availableTime[0].duration
                                                )
                                            }
                                            </span>
                                        </div>

                                        {/* 승인/거절 버튼 또는 상태 표시 */}
                                        {application.status === 'pending' ? (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onReject?.(application.id)}
                                                >
                                                    <XCircle className="w-4 h-4 mr-1"/>
                                                    거절
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => onApprove?.(application.id)}
                                                    disabled={application.paymentStatus !== 'paid'}
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-1"/>
                                                    수락
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className={`px-3 py-1 rounded text-sm ${
                                                application.status === 'approved'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-red-50 text-red-600'
                                            }`}>
                                                {application.status === 'approved' ? '승인됨' : '거절됨'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}