'use client'

import React from 'react';
import { Star, MessageCircle, Tag, ArrowUpRight } from 'lucide-react';
import { MentorReviewCard } from "@/components/mentor-review/MentorReviewCard";
import { Select } from "@/components/common/Select";
import { useReview } from "@/lib/hooks/useReview";
import { ReviewStats } from '@/types/core/review';
import { mockStats } from '@/lib/mocks/mentor-reviews';

const reviewFilterOptions = [
    { value: 'all', label: '전체 리뷰' },
    { value: 'unresponded', label: '미응답 리뷰' },
    { value: 'responded', label: '응답완료' },
    { value: 'reported', label: '신고된 리뷰' }
];

interface Props {
    stats?: ReviewStats;
}

export function MentorReviewSection({ stats = mockStats }: Props) {
    const [filter, setFilter] = React.useState('all');
    const reviewsWithMentoring = useReview();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    const filteredReviews = React.useMemo(() => {
        switch (filter) {
            case 'unresponded':
                return reviewsWithMentoring.filter(review => !review.reply);
            case 'responded':
                return reviewsWithMentoring.filter(review => review.reply);
            case 'reported':
                return reviewsWithMentoring.filter(review => review.status === 'reported');
            default:
                return reviewsWithMentoring;
        }
    }, [reviewsWithMentoring, filter]);

    const currentMonth = stats?.monthlyStats?.[0] || { reviewCount: 0, rating: 0 };

    return (
        <div className="space-y-6">
            {/* 리뷰 통계 */}
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Star className="w-5 h-5"/>
                        <span className="text-sm">평균 평점</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats?.averageRating || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">전체 {stats?.totalReviews || 0}개 리뷰</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MessageCircle className="w-5 h-5"/>
                        <span className="text-sm">응답률</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats?.responseRate || 0}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Tag className="w-5 h-5"/>
                        <span className="text-sm">자주 받은 평가</span>
                    </div>
                    <div className="space-y-2">
                        {stats.topTags.slice(0, 3).map((tag, index) => (
                            <div key={tag.tag}
                                 className={`flex justify-between items-center ${index !== 0 ? 'text-sm' : ''}`}>
                                <span
                                    className={`${index === 0 ? 'text-xl font-semibold text-gray-900' : 'text-gray-600'}`}>
                                    {tag.tag}
                                </span>
                                <span className="text-gray-500">
                                    {tag.count}회
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <ArrowUpRight className="w-5 h-5"/>
                        <span className="text-sm">이번 달 리뷰</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{currentMonth.reviewCount}</p>
                    <p className="text-sm text-gray-500 mt-1">평균 {currentMonth.rating}점</p>
                </div>
            </div>

            {/* 리뷰 필터 */}
            <div className="flex justify-end text-gray-600">
                <Select
                    value={filter}
                    onChange={handleFilterChange}
                    options={reviewFilterOptions}
                    inputSize="sm"
                />
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-4">
                {filteredReviews.map(review => (
                    <MentorReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </div>
        </div>
    );
}