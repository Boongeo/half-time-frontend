'use client'

import {SearchSection} from "@/components/explore/SearchSection";
import {FilterSection} from "@/components/explore/FilterSection";
import {mockMentors} from "@/lib/mocks/mentors";
import {MentorCard} from "@/components/explore/MentorCard";
import {useMentorFilter} from "@/lib/hooks/useMentorFilter";

export default function MentorExploreClient() {
    const {
        filteredMentors,
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        handleFilterChange: setFilter,
        setPriceRange,
        handleClearFilters: clearFilters
    } = useMentorFilter({ mentors: mockMentors });

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
                    onFilterChange={setFilter}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    onClearAll={clearFilters}
                />
            </div>

            {/* 필터링된 결과 카운트 */}
            <div className="mb-6 text-gray-600">
                총 {filteredMentors.length}명의 멘토
            </div>

            {/* 멘토 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor}/>
                ))}
            </div>
        </div>
    )
}