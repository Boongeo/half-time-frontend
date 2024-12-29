import { X } from "lucide-react";
import {ApplicationListProps} from "@/types/components/sessionProps";
import {SessionInfo} from "@/components/session/SessionInfo";
import {GroupApplications} from "@/components/session/GroupApplications";
import {IndividualApplications} from "@/components/session/IndividualApplications";

export function ApplicationList({
    session,
    applications,
    onClose,
    onApprove,
    onReject
}: ApplicationListProps) {
    return (
        <div className="h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">세션 상세</h2>
                    <p className="text-gray-500">
                        {session.type === 'group' ? '시간대별 신청 현황' : '멘티 신청 목록'}
                    </p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5"/>
                </button>
            </div>

            <SessionInfo session={session} />

            {applications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    아직 신청한 멘티가 없습니다
                </div>
            ) : session.type === 'group' ? (
                <GroupApplications
                    session={session}
                    applications={applications}
                    onApprove={onApprove}
                    onReject={onReject}
                />
            ) : (
                <IndividualApplications
                    session={session}
                    applications={applications}
                    onApprove={onApprove}
                    onReject={onReject}
                />
            )}
        </div>
    );
}