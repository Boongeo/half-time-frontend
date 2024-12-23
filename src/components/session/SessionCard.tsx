import { Session, MenteeApplication } from "@/types/core/mentoring";
import { Calendar, Video, Users, Clock } from "lucide-react";
import { getSessionTypeLabel, formatScheduleDisplay } from "@/lib/utils/session";

interface SessionCardProps {
    session: Session;
    isSelected: boolean;
    applications: MenteeApplication[];
    onClick: () => void;
}

export function SessionCard({ session, isSelected, applications, onClick }: SessionCardProps) {
    const approvedApplications = applications.filter(app => app.status === 'approved');

    const getBadgeStyles = (type: 'individual' | 'group') => {
        if (type === 'individual') {
            return 'bg-purple-100 text-purple-600';
        }
        return 'bg-blue-100 text-blue-600';
    };

    const getBackgroundStyles = (type: 'individual' | 'group', isSelected: boolean) => {
        if (!isSelected) return 'hover:bg-gray-50';

        if (type === 'individual') {
            return 'bg-purple-50 hover:bg-purple-100';
        }
        return 'bg-blue-50 hover:bg-blue-100';
    };

    return (
        <div
            className={`p-4 cursor-pointer transition-colors
                ${getBackgroundStyles(session.type, isSelected)}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{session.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${getBadgeStyles(session.type)}`}>
                    {getSessionTypeLabel(session.type, session.maxParticipants as number)}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{session.description}</p>

            <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4"/>
                    <span className="truncate">{formatScheduleDisplay(session.availableTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Video className="w-4 h-4"/>
                    <span>화상 세션</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4"/>
                    <span>세션 {session.availableTime[0].duration}분</span>
                </div>
                {session.type === 'group' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4"/>
                        <span>
                            {approvedApplications.length}/{session.maxParticipants}명 참여중
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t">
                <div className="font-medium text-gray-900">
                {session.price.toLocaleString()}원
                    <span className="text-gray-500 font-normal">/시간</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        신청 {applications.length}건
                    </span>
                </div>
            </div>
        </div>
    );
}