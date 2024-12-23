'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { ExtendedSession, ExtendedSessionFormData } from "@/types/core/mentoring";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { SessionCard } from "@/components/session/SessionCard";
import { CreateSessionModal } from "@/components/session/CreateSessionModal";
import { ApplicationList } from "@/components/session/ApplicationList";
import {mockMenteeApplications, mockSessions} from "@/lib/mocks/sessions";

const initialFormData: ExtendedSessionFormData = {
    title: '',
    description: '',
    availableTime: [],
    price: '',
    type: 'individual',
    maxParticipants: '1'
};

export default function MentorSessionPage() {
    const [sessions, setSessions] = useState<ExtendedSession[]>(mockSessions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<ExtendedSession | null>(null);
    const [formData, setFormData] = useState<ExtendedSessionFormData>(initialFormData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTimeChange = (times: Array<{ day: string; times: string[]; duration: number }>) => {
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
            price: Number(formData.price),
            type: formData.type,
            maxParticipants: Number(formData.maxParticipants)
        };
        setSessions(prev => [...prev, newSession]);
        setFormData(initialFormData);
        setIsModalOpen(false);
    };

    const getApplicationsBySession = (sessionId: number) => {
        return mockMenteeApplications.filter(app => app.sessionId === sessionId);
    };

    const handleApproveApplication = (applicationId: number) => {
        // TODO: 멘토링 승인 로직 구현
        console.log('Approve application:', applicationId);
    };

    const handleRejectApplication = (applicationId: number) => {
        // TODO: 멘토링 거절 로직 구현
        console.log('Reject application:', applicationId);
    };

    return (
        <div className="flex flex-col h-full pb-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">멘토링 세션 관리</h1>
                    <p className="text-gray-500">멘토링 세션을 생성하고 관리하세요</p>
                </div>

                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4"/>
                    새 세션 만들기
                </Button>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex h-[calc(100vh-270px)]">
                {/* 왼쪽 세션 목록 */}
                <div className="w-[40%] border-r bg-white overflow-y-auto">
                    <div className="divide-y">
                        {sessions.map((session) => (
                            <SessionCard
                                key={session.id}
                                session={session}
                                isSelected={selectedSession?.id === session.id}
                                applications={getApplicationsBySession(session.id)}
                                onClick={() => setSelectedSession(session)}
                            />
                        ))}
                    </div>
                </div>

                {/* 오른쪽 세션 상세/신청 목록 */}
                <div className="w-[60%] overflow-y-auto">
                    {selectedSession ? (
                        <ApplicationList
                            session={selectedSession}
                            applications={getApplicationsBySession(selectedSession.id)}
                            onClose={() => setSelectedSession(null)}
                            onApprove={handleApproveApplication}
                            onReject={handleRejectApplication}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            왼쪽에서 세션을 선택하세요
                        </div>
                    )}
                </div>

                <CreateSessionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onTimeChange={handleTimeChange}
                    onSubmit={handleCreateSession}
                />
            </div>

            {/* 세션 생성 모달 */}
            <CreateSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                onInputChange={handleInputChange}
                onTimeChange={handleTimeChange}
                onSubmit={handleCreateSession}
            />
        </div>
    );
}