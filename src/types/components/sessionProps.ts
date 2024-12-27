import {MenteeApplication, Mentoring, Session, SessionFormData} from "../core/mentoring";
import {ChangeEvent, FormEvent} from "react";

export interface ApplicationListProps {
    session: Session;
    application: MenteeApplication[];
    mentoring: Map<number, Mentoring>
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
    onTimeChange: (days: Array<{ day: string; times: string[]; }>) => void;
    onSubmit: (e: FormEvent) => void;
}

export interface SessionCardProps {
    session: Session;
    isSelected: boolean;
    applications: MenteeApplication[];
    onClick: () => void;
}