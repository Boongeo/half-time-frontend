import { Mentor } from "@/types/core/mentor";
import { BriefcaseBusiness, CircleDollarSign } from "lucide-react";

const MentorInfoTab = ({ mentor }: { mentor: Mentor }) => (
    <div className="flex flex-col mt-8 gap-3">
        {/* 경력 카드 */}
        <div className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">경력</h3>
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BriefcaseBusiness className="w-4 h-4" />
                    <span>{mentor.experience}년</span>
                </div>
            </div>
        </div>

        {/* 기술 스택 카드 */}
        <div className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">기술 스택</h3>
            </div>
            <div className="flex gap-1">
                {mentor.techStack.map((tech, index) => (
                    <span
                        key={index}
                        className="px-2 py-0.5 bg-themeColor text-sm rounded-full text-white"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {/* 시간당 비용 카드 */}
        <div className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">시간당 비용</h3>
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{mentor.hourlyRate.toLocaleString()}원</span>
                </div>
            </div>
        </div>
    </div>
);

export default MentorInfoTab;
