import { ChangeEvent, FormEvent } from "react";
import { ExtendedSessionFormData } from "@/types/core/mentoring";
import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import MentoringTimeSettings from "@/components/mentoring/MentoringTimeSettings";

interface CreateSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: ExtendedSessionFormData;
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onTimeChange: (times: Array<{ day: string; times: string[]; duration: number }>) => void;
    onSubmit: (e: FormEvent) => void;
}

export function CreateSessionModal({
   isOpen,
   onClose,
   formData,
   onInputChange,
   onTimeChange,
   onSubmit
}: CreateSessionModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="새 멘토링 세션 만들기"
            description="멘티들이 참여할 수 있는 멘토링 세션을 만들어보세요."
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">멘토링 유형</label>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={onInputChange}
                        options={[
                            {value: 'individual', label: '1:1 멘토링'},
                            {value: 'group', label: '그룹 멘토링'}
                        ]}
                    />
                </div>

                {formData.type === 'group' && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">최대 참여 인원</label>
                        <Input
                            name="maxParticipants"
                            type="number"
                            min="2"
                            max="10"
                            value={formData.maxParticipants}
                            onChange={onInputChange}
                            className="w-32"
                        />
                        <p className="text-sm text-gray-500">2-10명까지 설정 가능합니다</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">세션 제목</label>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={onInputChange}
                        placeholder="예) React 기초부터 실전까지"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">세션 설명</label>
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={onInputChange}
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
                        onChange={onTimeChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">시간당 가격</label>
                    <div className="flex items-center gap-2">
                        <Input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={onInputChange}
                            placeholder="시간당 가격을 입력하세요"
                            min="0"
                            step="1000"
                            required
                            className="w-48"
                        />
                        <span className="text-gray-500 text-sm">원 / {formData.type === 'group' ? '인당' : '시간'}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
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
    );
}