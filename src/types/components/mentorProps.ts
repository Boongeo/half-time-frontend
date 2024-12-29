import {CalendarProps} from "react-calendar";

/** Review Props */
export interface ReviewCardProps {
    id: number;
    userId: string;
    rating: number;
    reviewer: string;
    date: string;
    content: string;
    categories: string[];
}

/** Calender Props */
export type CalendarValue = CalendarProps['value'];

/** Mentor Registration */
interface Step {
    id: number;
    title: string;
    component?: React.ComponentType;
}

export interface ProgressStepsProps {
    steps: readonly Step[];
    currentStep: number;
}