import {Mentor} from "@/types/core/mentor";
import {BriefcaseBusiness, CircleDollarSign, Pickaxe} from "lucide-react";

const MentorInfoTab = ({ mentor }: { mentor: Mentor }) => (
    <div className="flex flex-col mt-8 gap-5">
        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <BriefcaseBusiness className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">경력</p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="text-lg font-semibold text-gray-800">{mentor.experience}년</p>
                </div>
            </div>
        </div>
        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <Pickaxe className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">기술 스택</p>
                </div>
                <div className="flex flex-row gap-4">
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
            </div>
        </div>

        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <CircleDollarSign className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">시간당 비용</p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="text-lg font-semibold text-gray-800">{mentor.hourlyRate.toLocaleString()}원</p>
                </div>
            </div>
        </div>
    </div>
);

export default MentorInfoTab