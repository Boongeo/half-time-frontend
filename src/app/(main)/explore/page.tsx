'use client'

import {useState} from "react";
import {SearchSection} from "@/components/explore/SearchSection";
import {FilterSection} from "@/components/explore/FilterSection";
import {mockMentors} from "@/lib/mocks/mentors";
import {MentorCard} from "@/components/explore/MentorCard";
import {FilterKey, FilterValues} from "@/types/featureProps";

export default function MentorExplorePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<FilterValues>({
        techStack: [],
        experience: [],
        rating: []
    });

    const handleFilterChange = (key: FilterKey, values: string[]) => {
        setFilters(prev => ({
            ...prev,
            [key]: values
        }));
    };

    return (
        <div className="p-12">
            {/* 페이지 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">멘토 찾기</h1>
                <p className="text-gray-600">나에게 맞는 멘토를 찾아보세요</p>
            </div>

            {/* 필터 섹션 */}
            <div className="bg-white rounded-lg shadow p-6 mb-8 space-y-6">
                <SearchSection
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                <FilterSection
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* 멘토 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mockMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor}/>
                ))}
            </div>
        </div>
    )
}