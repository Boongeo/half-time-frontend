import {Mail, MessageCircle} from "lucide-react";
import {Mentor} from "@/types/core/mentor";
import {formatDeveloperTitle} from "@/lib/utils/category";

const MentorProfile = ({ mentor }: { mentor: Mentor }) => {
    const developerTitle = formatDeveloperTitle(mentor.experience, mentor.interest);

    return (
        <div className="flex gap-24 items-center">
            <div className="flex flex-row items-center gap-8">
                <img
                    src={mentor.profileImage}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div className="flex-1">
                    <div className="flex flex-row items-center gap-2">
                        <h1 className="text-2xl text-gray-800 font-bold">{mentor.name}</h1>
                        <p className="text-gray-500">{developerTitle} @ {mentor.company}</p>
                    </div>
                    <p className="mt-3 text-md text-gray-600 font-medium break-words">
                        {mentor.intro}
                    </p>
                </div>
            </div>

            {/* 이메일/메시지 보내기 버튼 */}
            <div className="flex gap-4">
                <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                    <Mail size={20} color="#333"/>
                </button>
                <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                    <MessageCircle size={20} color="#333"/>
                </button>
            </div>
        </div>
    )
}

export default MentorProfile;