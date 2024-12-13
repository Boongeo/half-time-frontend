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
};