'use client'

import React from 'react';
import { Card } from '@/components/common/Card';
import { Calendar, Users, TrendingUp, CircleDollarSign, Star, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MentorReviewSection } from '@/components/mentor-review/MentorReviewSection';
import { mockStats } from '@/lib/mocks/mentor-reviews';
import UpcomingSessions from '@/components/session/UpcomingSessions';

// 수익 추이 더미 데이터
const revenueData = [
    { month: '1월', revenue: 1200000 },
    { month: '2월', revenue: 1500000 },
    { month: '3월', revenue: 1800000 },
    { month: '4월', revenue: 2200000 },
];

export default function MentorDashboard() {
    return (
        <div className="flex flex-col h-full pb-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">멘토 대시보드</h1>
                    <p className="text-gray-500">멘토링 활동 현황과 통계를 확인하세요</p>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto bg-white px-6 py-6 space-y-6">
                {/* 핵심 지표 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card fullWidth className="bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-500">이번 달 멘토링</span>
                            <Calendar className="w-4 h-4 text-gray-500"/>
                        </div>
                        <div className="text-2xl font-bold">24회</div>
                        <p className="text-xs text-gray-500 mt-1">전월 대비 +12%</p>
                    </Card>

                    <Card fullWidth className="bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-500">전체 멘티</span>
                            <Users className="w-4 h-4 text-gray-500"/>
                        </div>
                        <div className="text-2xl font-bold">127명</div>
                        <p className="text-xs text-gray-500 mt-1">신규 멘티 +8명</p>
                    </Card>

                    <Card fullWidth className="bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-500">평균 평점</span>
                            <Star className="w-4 h-4 text-gray-500"/>
                        </div>
                        <div className="text-2xl font-bold">{mockStats.averageRating}</div>
                        <p className="text-xs text-gray-500 mt-1">총 {mockStats.totalReviews}개 리뷰</p>
                    </Card>
                </div>

                {/* 수익 차트 */}
                <Card fullWidth className="bg-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">월별 수익 추이</h2>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="month" style={{fontSize: '14px'}}/>
                                    <YAxis
                                        style={{fontSize: '14px'}}
                                        tickFormatter={(value) => `${(value / 10000).toLocaleString()}만`}
                                    />
                                    <Tooltip
                                        contentStyle={{fontSize: '14px'}}
                                        labelStyle={{fontSize: '14px'}}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#344468"
                                        name="수익"
                                        strokeWidth={2}
                                        dot={{r: 3}}
                                        formatter={(value) => `${value.toLocaleString()}원`}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>

                {/* 예정된 멘토링 */}
                <Card fullWidth className="bg-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">예정된 멘토링</h2>
                        </div>
                        <UpcomingSessions />
                    </div>
                </Card>
            </div>
        </div>
    );
}