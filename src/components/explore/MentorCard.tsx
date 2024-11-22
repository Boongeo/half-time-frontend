import {MentorCardProps} from "@/types/props";
import {Card} from "@/components/common/Card";
import Image from "next/image";

export function MentorCard({ mentor }: MentorCardProps) {
    return (
        <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
            {/* 멘토 프로필 이미지 */}
            <div className="relative h-48">
                <Image
                    src={mentor.profileImage}
                    alt={`${mentor.name} profile`}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="pt-4 pb-0">
                {/* 이름 & 가격 정보 */}
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base font-semibold text-gray-900">{mentor.name}</h3>
                    <div className="text-xs font-medium text-gray-900 whitespace-nowrap">
                        ₩{mentor.hourlyRate.toLocaleString()}/시간
                    </div>
                </div>

                {/* 직무 & 회사 정보 */}
                <div className="space-y-0.5 mb-2">
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <p className="text-xs text-gray-500">{mentor.company}</p>
                </div>

                {/* 기술 배지 */}
                <div className="flex gap-1.5 my-2">
                    {mentor.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 bg-themeColor text-xs rounded-full text-white"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* 멘토 소개글 */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {mentor.intro}
                </p>

                {/* 평점 및 경력 정보 */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>⭐ {mentor.rating} · {mentor.reviewCount}개의 리뷰</span>
                    <span>경력 {mentor.experience}년</span>
                </div>
            </div>
        </Card>
    );
}