'use client'

import {ChangeEvent, FormEvent, useState} from "react";
import {Session, SessionFormData, TimeSchedule} from "@/types/core/mentoring";
import { Card } from "@/components/common/Card";
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import {Calendar, PlusCircle, Video} from "lucide-react";
import {Modal} from "@/components/common/Modal";
import MentoringTimeSettings from "@/components/mentoring/MentoringTimeSettings";

export default function MentorSessionPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<SessionFormData>({
        title: '',
        description: '',
        availableTime: [],
        price: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeChange = (times: TimeSchedule[]) => {
        setFormData(prev => ({
            ...prev,
            availableTime: times
        }));
    };

    const handleCreateSession = (e: FormEvent) => {
        e.preventDefault();

        const newSession = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            availableTime: formData.availableTime,
            price: Number(formData.price)
        };

        setSessions(prev => [...prev, newSession]);
        setFormData({
            title: '',
            description: '',
            availableTime: [],
            price: ''
        });
        setIsModalOpen(false);
    };

    const formatScheduleDisplay = (availableTime: TimeSchedule[]) => {
        if (!availableTime.length) return '시간 미설정';

        return availableTime
            .map(schedule => `${schedule.day}요일 (${schedule.times.length}타임)`)
            .join(', ');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">멘토링 세션 관리</h1>
                    <p className="text-gray-500">1:1 멘토링 세션을 생성하고 관리하세요</p>
                </div>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    <PlusCircle className="w-4 h-4"/>
                    새 세션 만들기
                </Button>
            </div>

            {/* 세션 생성 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="새 멘토링 세션 만들기"
                description="멘티들이 참여할 수 있는 1:1 멘토링 세션을 만들어보세요."
            >
                <form onSubmit={handleCreateSession} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">세션 제목</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="예) React 기초부터 실전까지"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">세션 설명</label>
                        <Input
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="멘토링 세션에 대한 설명을 입력하세요"
                            inputSize="xl"
                            multiline={true}
                            rows={3}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">진행 요일</label>
                        <MentoringTimeSettings
                            availableTime={formData.availableTime}
                            onChange={handleTimeChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">시간당 가격</label>
                        <Input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="시간당 가격을 입력하세요"
                            min="0"
                            step="1000"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsModalOpen(false)}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={!formData.availableTime.length}
                        >
                            세션 만들기
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* 세션 카드 목록 */}
            <div className="grid grid-cols-2 gap-6">
                {sessions.map((session) => (
                    <div key={session.id}>
                        <Card
                            className="hover:border-blue-300 transition-colors w-full"
                        >
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">{session.title}</h3>
                            <div className="mt-4 space-y-3">
                                <p className="text-sm text-gray-600">{session.description}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4"/>
                                        <span>{formatScheduleDisplay(session.availableTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Video className="w-4 h-4"/>
                                        <span>화상 세션</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t flex justify-between items-center">
                                <span className="font-semibold">
                                  {session.price.toLocaleString()}원
                                  <span className="text-sm text-gray-500">/시간</span>
                                </span>
                                    <Button variant="outline" size="sm">
                                        관리
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}