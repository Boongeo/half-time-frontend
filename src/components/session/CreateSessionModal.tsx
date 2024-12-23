import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import MentoringTimeSettings from "@/components/mentoring/MentoringTimeSettings";
import {CreateSessionModalProps} from "@/types/components/sessionProps";

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
                    <label className="text-sm font-medium text-gray-600">진행 방식</label>
                    <Select
                        name="method"
                        value={formData.method}
                        onChange={onInputChange}
                        options={[
                            {value: 'online', label: '온라인'},
                            {value: 'offline', label: '오프라인'}
                        ]}
                    />
                </div>

                {formData.method === 'offline' ? (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">진행 장소</label>
                        <Input
                            name="location"
                            value={formData.location || ''}
                            onChange={onInputChange}
                            placeholder="멘토링이 진행될 장소를 입력하세요"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            구체적인 주소를 입력해주세요. (예: 서울시 강남구 테헤란로 123)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">화상 미팅 링크</label>
                        <Input
                            name="link"
                            value={formData.link || ''}
                            onChange={onInputChange}
                            placeholder="Zoom 링크를 입력하세요"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            줌 링크는 멘토링 승인 후 멘티에게 공개됩니다
                        </p>
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
                    <label className="text-sm font-medium text-gray-600">세션당 가격</label>
                    <div className="flex items-center gap-2">
                        <Input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={onInputChange}
                            placeholder="세션당 가격을 입력하세요"
                            min="0"
                            step="1000"
                            required
                            className="w-48"
                        />
                        <span className="text-gray-500 text-sm">원 / {formData.type === 'group' ? '인당' : '세션'}</span>
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