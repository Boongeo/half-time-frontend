import { CalendarDays, CheckCircle, XCircle, User } from "lucide-react";
import { Button } from "@/components/common/Button";
import { groupApplicationsByTimeSlot } from "@/lib/utils/session";
import {ApplicationListProps} from "@/types/components/sessionProps";

export function GroupApplications({
  session,
  applications,
  onApprove,
  onReject
}: Omit<ApplicationListProps, 'onClose'>) {
    const timeSlotGroups = groupApplicationsByTimeSlot(applications);

    return (
        <div className="space-y-6 text-gray-600">
            {timeSlotGroups.map(group => {
                const paidCount = group.applications.filter(
                    app => app.paymentStatus === 'paid'
                ).length;
                const groupStatus = group.applications[0]?.status || 'pending';
                const isGroupFull = group.applications.length >= (session.maxParticipants || 0);

                return (
                    <div
                        key={`${group.date}-${group.time}`}
                        className="border rounded-lg overflow-hidden"
                    >
                        {/* 시간대 헤더 */}
                        <div className="bg-gray-50 p-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-gray-500"/>
                                    <span className="font-medium">
                                        {new Date(group.date).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'short'
                                        })}
                                        {' '}
                                        {group.time}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* 신청 현황 뱃지 */}
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        isGroupFull
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {isGroupFull ? '정원 마감' : `${group.applications.length}/${session.maxParticipants}명 신청`}
                                    </span>

                                    {/* 결제 현황 뱃지 */}
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        paidCount >= group.applications.length
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-yellow-50 text-yellow-600'
                                    }`}>
                                        {paidCount >= group.applications.length
                                            ? '전원 결제 완료'
                                            : `${paidCount}/${group.applications.length}명 결제완료`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 신청자 목록 */}
                        <div className="divide-y">
                            {group.applications.map((application) => (
                                <div key={application.id} className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        {/* 프로필 이미지 */}
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

                                        {/* 신청자 정보 */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">{application.mentee.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    application.paymentStatus === 'paid'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-yellow-50 text-yellow-600'
                                                }`}>
                                                    {application.paymentStatus === 'paid' ? '결제완료' : '결제대기'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">{application.mentee.interest}</p>
                                        </div>
                                    </div>

                                    {/* 신청 메시지 */}
                                    <p className="text-sm text-gray-600 ml-11">{application.message}</p>
                                </div>
                            ))}
                        </div>

                        {/* 그룹 전체 승인/거절 버튼 */}
                        <div className="p-4 bg-gray-50 border-t">
                            {groupStatus === 'pending' ? (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            group.applications.forEach(app => onReject?.(app.id));
                                        }}
                                    >
                                        <XCircle className="w-4 h-4 mr-1"/>
                                        전체 거절
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            group.applications.forEach(app => onApprove?.(app.id));
                                        }}
                                        disabled={paidCount !== group.applications.length || isGroupFull}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1"/>
                                        전체 승인
                                    </Button>
                                </div>
                            ) : (
                                <div className={`w-full px-3 py-2 rounded text-sm text-center ${
                                    groupStatus === 'approved'
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                    {groupStatus === 'approved' ? '승인완료' : '거절됨'}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}