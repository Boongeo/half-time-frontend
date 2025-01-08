import {getBaseUrl} from "@/lib/utils/api";

const baseUrl = getBaseUrl();

export const getMentoringList = async () => {
    const url = new URL(`/api/mentorings`, baseUrl);
    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch mentoring list');
    }

    return response.json();
};

export const getBookingList = async (status?: string) => {
    const baseUrl = getBaseUrl();
    const path = status ? `/api/bookings/${status}` : `/api/bookings`;
    const url = new URL(path, baseUrl);

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch mentoring list');
    }

    return response.json();
};

export const bookMentoring = async (bookingData: { subject: string; date: string; timeSlot: string; studentId: number }) => {
    const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) throw new Error('Failed to post mentoring');
    return response.json();
};
