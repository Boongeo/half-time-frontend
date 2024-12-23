import { Session, MenteeApplication } from "@/types/core/mentoring";
import { Calendar, Video, Users, Clock, MapPin } from "lucide-react";
import {getSessionTypeLabel, formatScheduleDisplay, getGroupCount} from "@/lib/utils/session";

interface SessionCardProps {
    session: Session;
    isSelected: boolean;
    applications: MenteeApplication[];
    onClick: () => void;
}

export function SessionCard({ session, isSelected, applications, onClick }: SessionCardProps) {
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

    const getMethodIcon = () => {
        if (session.method === 'online') {
            return <Video className="w-4 h-4 text-blue-500" />;
        }
        return <MapPin className="w-4 h-4 text-rose-500" />;
    };

    const getMethodText = () => {
        if (session.method === 'online') {
            return '온라인 세션';
        }
        if (session.method === 'offline') {
            return '오프라인 세션';
        }
    };

    const getMethodClass = () => {
        return session.method === 'online'
            ? 'text-blue-600'
            : 'text-rose-600';
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
                <div className={`flex items-center gap-2 text-sm ${getMethodClass()}`}>
                    {getMethodIcon()}
                    <span>{getMethodText()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4"/>
                    <span>세션 {session.availableTime[0].duration}분</span>
                </div>
                {session.type === 'group' ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4"/>
                        <span>
                            <span className="text-green-600">
                                {getGroupCount(applications.filter(app => app.status === 'approved'))}개 그룹 확정
                            </span>
                            <span className="text-yellow-600 ml-1">
                                {getGroupCount(applications.filter(app => app.status === 'pending'))}개 그룹 대기
                            </span>
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4"/>
                        <span>
                            <span className="text-green-600">
                                {applications.filter(app => app.status === 'approved').length}명 확정
                            </span>
                            <span className="text-yellow-600 ml-1">
                                {applications.filter(app => app.status === 'pending').length}명 대기
                            </span>
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t">
                <div className="font-medium text-gray-900">
                    {session.price.toLocaleString()}원
                    <span className="text-gray-500 font-normal">/세션</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                       {session.type === 'group'
                           ? `신청 ${getGroupCount(applications)}개 그룹`
                           : `신청 ${applications.length}명`
                       }
                    </span>
                </div>
            </div>
        </div>
    );
}