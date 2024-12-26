'use client'

import React from 'react';
import { Star, MessageCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { MentorReviewCard } from "@/components/mentor-review/MentorReviewCard";
import {Select} from "@/components/common/Select";
import {useReview} from "@/lib/hooks/useReview";
import { ReviewStats } from '@/types/core/review';

const reviewFilterOptions = [
    { value: 'all', label: '전체 리뷰' },
    { value: 'unresponded', label: '미응답 리뷰' },
    { value: 'responded', label: '응답완료' },
    { value: 'reported', label: '신고된 리뷰' }
];

interface Props {
    stats: ReviewStats;
}

export function MentorReviewSection({ stats }: Props) {
    const [filter, setFilter] = React.useState('all');
    const reviewsWithSession = useReview();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
        // TODO: 필터링 로직 구현
    };

    const filteredReviews = React.useMemo(() => {
        switch (filter) {
            case 'unresponded':
                return reviewsWithSession.filter(review => !review.reply);
            case 'responded':
                return reviewsWithSession.filter(review => review.reply);
            case 'reported':
                return reviewsWithSession.filter(review => review.isReported);
            default:
                return reviewsWithSession;
        }
    }, [reviewsWithSession, filter]);

    return (
        <div className="space-y-6">
            {/* 리뷰 통계 */}
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Star className="w-5 h-5"/>
                        <span className="text-sm">평균 평점</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}</p>
                    <p className="text-sm text-gray-500 mt-1">전체 {stats.totalReviews}개 리뷰</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MessageCircle className="w-5 h-5"/>
                        <span className="text-sm">응답률</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats.responseRate}%</p>
                    <p className="text-sm text-gray-500 mt-1">{stats.unrespondedReviews}개 미응답</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Calendar className="w-5 h-5"/>
                        <span className="text-sm">이번 달 리뷰</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats.monthlyReviews}</p>
                    <p className="text-sm text-gray-500 mt-1">전월 대비 {stats.reviewGrowth}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <ArrowUpRight className="w-5 h-5"/>
                        <span className="text-sm">추천률</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{stats.recommendRate}%</p>
                    <p className="text-sm text-gray-500 mt-1">최근 30일 기준</p>
                </div>
            </div>

            {/* 리뷰 필터 */}
            <div className="flex justify-end">
                <Select
                    value={filter}
                    onChange={handleFilterChange}
                    options={reviewFilterOptions}
                    inputSize="sm"
                />
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-4 bg-white rounded-lg">
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