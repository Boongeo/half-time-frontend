import { Video, MapPin, CalendarDays } from "lucide-react";
import { formatSessionTime } from "@/lib/utils/session";
import {SessionInfoProps} from "@/types/components/sessionProps";

export function SessionInfo({ session }: SessionInfoProps) {
    return (
        <div className="mb-6">
            <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                    {session.method === 'online' ? (
                        <>
                            <Video className="w-4 h-4 text-blue-500"/>
                            <h3 className="font-medium">온라인 세션</h3>
                        </>
                    ) : (
                        <>
                            <MapPin className="w-4 h-4 text-rose-500"/>
                            <h3 className="font-medium">오프라인 세션</h3>
                        </>
                    )}
                </div>
                <div className="mt-2 ml-6">
                    {session.method === 'online' ? (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">{session.link}</span>
                            <button
                                onClick={() => navigator.clipboard.writeText(session.link || '')}
                                className="text-blue-500 hover:text-blue-600 text-sm"
                            >
                                복사
                            </button>
                        </div>
                    ) : (
                        <span className="text-gray-600">{session.location}</span>
                    )}
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-700">
                    <CalendarDays className="w-4 h-4"/>
                    <h3 className="font-medium text-sm mt-1">예약 가능 시간</h3>
                </div>
                <div className="space-y-2">
                    {session.availableTime.map((schedule) => (
                        <div key={schedule.day} className="flex items-center gap-2">
                            <span className="ml-1 w-6 font-medium text-gray-600">
                                {schedule.day}
                            </span>
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
        </div>
    );
}