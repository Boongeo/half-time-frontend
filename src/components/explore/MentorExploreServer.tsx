'use client'

import { SearchSection } from "@/components/explore/SearchSection";
import { FilterSection } from "@/components/explore/FilterSection";
import { MentorCard } from "@/components/explore/MentorCard";
import { useMentorSearch } from "@/lib/hooks/useMentorSearch";
import {MentorExploreServerProps} from "@/types/featureProps";

export default function MentorExploreServer({ initialMentors }: MentorExploreServerProps) {
    const {
        mentors,
        totalMentors,
        isLoading,
        error,
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        setFilter,
        setPriceRange,
        clearFilters,
        loadMore,
        hasMore
    } = useMentorSearch({ initialMentors });

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
                총 {totalMentors}명의 멘토
            </div>

            {/* 멘토 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor}/>
                ))}
            </div>

            {/* 로딩/에러 상태 */}
            {isLoading && <div className="text-center py-4">로딩 중...</div>}
            {error && <div className="text-center text-red-500 py-4">{error}</div>}

            {/* 무한 스크롤 */}
            {hasMore && (
                <div className="text-center py-8">
                    <button
                        onClick={loadMore}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                    >
                        더 보기
                    </button>
                </div>
            )}
        </div>
    );
}