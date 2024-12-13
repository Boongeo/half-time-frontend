export const getMentoringList = async () => {
    const response = await fetch(`/api/mentorings}`, {
        method: 'GET'
    });

    if (!response.ok) throw new Error('Failed to fetch mentoring list');
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
