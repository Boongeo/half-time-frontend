export interface Mentoring {
    id: string;
    subject: string;
    language: string;
    location: string;
    method: "offline" | "online";
    bookings: {
        date: string;
        timeSlots: {
            time: string;
            students: string[];
        }[];
    }[];
}

export interface TimeSchedule {
    day: string;
    times: string[];
}

export interface Session {
    id: number;
    title: string;
    description: string;
    availableTime: TimeSchedule[];
    price: number;
}

export interface SessionFormData {
    title: string;
    description: string;
    availableTime: TimeSchedule[];
    price: string;
}