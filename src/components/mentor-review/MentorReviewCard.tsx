'use client'

import { useState } from "react";
import { Button } from "@/components/common/Button";
import {AlertCircle, MapPin, MessageCircle, MonitorSmartphone, Star, Tag, User, Users} from "lucide-react";
import {ReviewWithMentoring} from "@/types/core/review";

export function MentorReviewCard({ review }: { review: ReviewWithMentoring }) {
    const [isReplying, setIsReplying] = useState(false);
    const SessionTypeIcon = review.mentoring.type === 'individual' ? User : Users;
    const MethodIcon = review.mentoring.method === 'online' ? MonitorSmartphone : MapPin;

    return (
        <div className="border rounded-lg bg-white text-gray-600">
            {/* 리뷰 헤더 */}
            <div className="p-4 bg-gray-50 border-b">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">
                            {review.mentoring.title}
                        </h3>
                        {/* 세션 타입 배지 */}
                        <div className={`
                            inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs
                            ${review.mentoring.type === 'individual'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-purple-50 text-purple-700'}
                        `}>
                            <SessionTypeIcon className="w-3.5 h-3.5"/>
                            {review.mentoring.type === 'individual' ? '1:1 멘토링' : '그룹 멘토링'}
                        </div>

                        {/* 진행 방식 배지 */}
                        <div className={`
                            inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs
                            ${review.mentoring.method === 'online'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-green-50 text-green-700'}
                        `}>
                            <MethodIcon className="w-3.5 h-3.5"/>
                            {review.mentoring.method === 'online' ? '온라인' : '오프라인'}
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    진행일: {new Date(review.mentoring.date).toLocaleDateString()} {review.mentoring.time} ·
                    리뷰 작성: {new Date(review.createdAt).toLocaleDateString()} ·
                    {review.mentee.name}
                </p>
            </div>

            {/* 리뷰 내용 */}
            <div className="p-4">
                {/* 태그 */}
                {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {review.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                            >
                                <Tag className="w-3 h-3"/>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* 리뷰 본문 */}
                <p className="text-gray-600 text-sm">{review.content}</p>

                {/* 멘토 답변 */}
                {review.reply ? (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="w-4 h-4 text-blue-500"/>
                            <h4 className="font-medium text-gray-900">나의 답변</h4>
                        </div>
                        <p className="text-sm text-gray-600">{review.reply}</p>
                    </div>
                ) : isReplying ? (
                    <div className="mt-4 pt-4 border-t">
                        <textarea
                            className="w-full p-3 border rounded-lg text-sm"
                            rows={4}
                            placeholder="리뷰에 대한 답변을 작성해주세요..."
                        />
                        <div className="flex justify-end gap-2 mt-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsReplying(false)}
                            >
                                취소
                            </Button>
                            <Button size="sm">답변 등록</Button>
                        </div>
                    </div>
                ) : null}

                {/* 리뷰 액션 */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        {review.status === 'reported' && (
                            <span className="flex items-center gap-1 text-sm text-red-600">
                                <AlertCircle className="w-4 h-4"/>
                                신고된 리뷰
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {!review.reply && !isReplying && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setIsReplying(true)}
                            >
                                답변하기
                            </Button>
                        )}
                        {review.status !== 'reported' && (
                            <Button variant="ghost" size="sm">
                                신고하기
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}