'use client'

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { AlertCircle, MessageCircle, Star } from "lucide-react";
import { ReviewWithDetails } from "@/types/core/review";

export function MentorReviewCard({ review }: { review: ReviewWithDetails }) {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <div className="border rounded-lg bg-white text-gray-600">
            {/* 리뷰 헤더 */}
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-medium text-gray-900">
                            {review.session.title}
                            <span className="ml-2 text-sm text-gray-500">
                                ({review.session.type === 'individual' ? '1:1 멘토링' : '그룹 멘토링'})
                            </span>
                        </h3>
                        <p className="text-sm text-gray-500">
                            진행일: {new Date(review.mentoring.date).toLocaleDateString()} {review.mentoring.time} ·
                            리뷰 작성: {new Date(review.createdAt).toLocaleDateString()} ·
                            {review.mentee.name} ·
                            {review.session.method === 'online' ? '온라인' : '오프라인'}
                        </p>
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

            {/* 리뷰 내용 */}
            <div className="p-4">
                <div className="space-y-3 text-gray-600">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700">좋았던 점</h4>
                        <p className="mt-1 text-sm">{review.positives}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-700">개선이 필요한 점</h4>
                        <p className="mt-1 text-sm">{review.improvements}</p>
                    </div>
                </div>

                {/* 멘토 답변 */}
                {review.reply ? (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
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
                        {review.isReported && (
                            <span className="flex items-center gap-1 text-sm text-red-600">
                                <AlertCircle className="w-4 h-4" />
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
                        <Button variant="ghost" size="sm">
                            신고하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}