import {MenteeApplication, Session, SessionFormData} from "../core/mentoring";
import {ChangeEvent, FormEvent} from "react";

export interface ApplicationListProps {
    session: Session;
    applications: MenteeApplication[];
    onClose: () => void;
    onApprove?: (applicationId: number) => void;
    onReject?: (applicationId: number) => void;
}

export interface SessionInfoProps {
    session: Session;
}

export interface CreateSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: SessionFormData;
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onTimeChange: (times: Array<{ day: string; times: string[]; duration: number }>) => void;
    onSubmit: (e: FormEvent) => void;
}

export interface SessionCardProps {
    session: Session;
    isSelected: boolean;
    applications: MenteeApplication[];
    onClick: () => void;
}