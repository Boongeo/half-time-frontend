import {useState} from "react";
import {Input} from "@/components/common/Input";
import {Button} from "@/components/common/Button";
import {useClickAway} from "@/lib/hooks/useClickAway";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    registrationId: number;
    onConfirm: (reason: string) => void;
}

export default function RejectModal({ isOpen, onClose, onConfirm }: ModalProps) {
    const [reason, setReason] = useState('');
    const modalRef = useClickAway<HTMLDivElement>(() => {
        onClose();
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
                <h3 className="text-lg font-semibold mb-4">멘토 등록 거절</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            거절 사유
                        </label>
                        <Input
                            multiline
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="거절 사유를 입력해주세요"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                if (reason.trim()) {
                                    onConfirm(reason);
                                }
                            }}
                            variant="primary"
                            disabled={!reason.trim()}
                        >
                            거절하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}