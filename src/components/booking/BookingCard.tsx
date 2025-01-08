'use client';

import { BookingApplication } from "@/types/core/mentoring";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import {getSessionTitle} from "@/lib/utils/session";

interface MenteeApplicationCardProps {
    application: BookingApplication;
}

const BookingCard: React.FC<MenteeApplicationCardProps> = ({ application }) => {
    const statusColors = {
        pending: "bg-yellow-100 text-yellow-600",
        approved: "bg-green-100 text-green-600",
        rejected: "bg-red-100 text-red-600",
        cancelled: "bg-gray-100 text-gray-600",
    };

    const sessionTitle = getSessionTitle(application.sessionId);

    return (
        <div className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">{sessionTitle}</h3>
                <span
                    className={`px-2 py-1 rounded-full text-sm ${statusColors[application.status]}`}
                >
                    {application.status}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{application.message}</p>
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4"/>
                    <span>{application.preferredDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4"/>
                    <span>{application.preferredTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4"/>
                    <span>결제 상태: {application.paymentStatus}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
