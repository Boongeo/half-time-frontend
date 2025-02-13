'use client'

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { mockSessions, mockMentorings } from '@/lib/mocks/sessions';

export default function UpcomingSessions() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 멘토링이 있는 날짜들
    const mentoringDates = mockMentorings.map(mentoring => new Date(mentoring.date));

    const filteredMentorings = mockMentorings.filter(mentoring => {
        const mentoringDate = new Date(mentoring.date);
        return mentoringDate.toDateString() === selectedDate.toDateString();
    });

    const getMentoringWithSession = (mentoring) => {
        const session = mockSessions.find(s => s.id === mentoring.sessionId);
        return { ...mentoring, session };
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* 달력 영역 */}
            <div className="bg-white rounded-lg border p-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                    locale={ko}
                    dateFormat="yyyy/MM/dd"
                    dayClassName={(date) => {
                        const today = new Date();
                        if (date.toDateString() === today.toDateString()) {
                            return 'text-blue-600 font-bold'; // 오늘 날짜는 항상 파란색 굵은 글씨
                        }
                        return undefined;
                    }}
                    renderDayContents={(day, date) => {
                        const hasSession = mentoringDates.some(
                            md => md.toDateString() === date.toDateString()
                        );
                        return (
                            <div className="relative flex items-center justify-center">
                                <span>{day}</span>
                                {hasSession && (
                                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                                )}
                            </div>
                        );
                    }}
                />
            </div>

            {/* 멘토링 리스트 영역 */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    {selectedDate.toLocaleDateString()} 예정된 멘토링
                </h2>
                <div className="space-y-3">
                    {filteredMentorings.length > 0 ? (
                        filteredMentorings.map(mentoring => {
                            const mentoringWithSession = getMentoringWithSession(mentoring);
                            return (
                                <div
                                    key={mentoring.id}
                                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">
                                                {mentoringWithSession.session?.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {mentoring.time} ·
                                                {mentoringWithSession.session?.type === 'group'
                                                    ? `그룹 멘토링 (${mentoring.currentParticipantCount}/${mentoring.maxParticipantCount})`
                                                    : '1:1 멘토링'
                                                }
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {mentoringWithSession.session?.method === 'online' ? '온라인' : '오프라인'}
                                                {mentoringWithSession.session?.location && ` · ${mentoringWithSession.session.location}`}
                                            </p>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-700">
                                            자세히 보기
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                            예정된 멘토링이 없습니다
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}