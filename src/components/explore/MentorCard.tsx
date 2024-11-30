import {MentorCardProps} from "@/types/components/featureProps";
import {Card} from "@/components/common/Card";
import Image from "next/image";
import {formatDeveloperTitle, getTechDisplayName} from "@/lib/utils/category";

export function MentorCard({ mentor }: MentorCardProps) {
    const displayedTechStack = mentor.techStack.slice(0, 3);
    const developerTitle = formatDeveloperTitle(mentor.experience, mentor.interest);

    return (
        <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full h-[440px] relative">
            {/* 멘토 프로필 이미지 */}
            <div className="relative h-48">
                <Image
                    src={mentor.profileImage}
                    alt={`${mentor.name} profile`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* 멘토 상세 정보 */}
            <div className="py-2 px-1 relative h-[calc(200px)]">
                <div className="space-y-2">
                    {/* 이름 & 가격 */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-semibold text-gray-900">{mentor.name}</h3>
                        <div className="text-xs font-medium text-gray-900 whitespace-nowrap">
                            ₩{mentor.hourlyRate.toLocaleString()}/1h
                        </div>
                    </div>

                    {/* 직무 & 회사 */}
                    <div className="space-y-0.5">
                        <p className="text-sm text-gray-600">{developerTitle}</p>
                        <p className="text-xs text-gray-500">{mentor.company}</p>
                    </div>

                    {/* 기술 배지 */}
                    <div className="flex gap-1.5">
                        {displayedTechStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 bg-themeColor text-xs rounded-full text-white"
                            >
                                {getTechDisplayName(tech)}
                            </span>
                        ))}
                    </div>

                    {/* 소개 텍스트 */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {mentor.intro}
                    </p>
                </div>

                {/* 평점 및 경력 */}
                <div className="absolute bottom-1 left-1 right-1 pt-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>⭐ {mentor.rating} · {mentor.reviewCount}개의 리뷰</span>
                        <span>경력 {mentor.experience}년</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}