import { useState, useEffect } from 'react';
import { BookingService } from '@/lib/services/bookingService';
import { Mentoring } from '@/types/core/mentoring';

const bookingService = new BookingService();

export const useBooking = () => {
    const [selectedMentoring, setSelectedMentoring] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [bookedTimeSlot, setBookedTimeSlot] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [totalMentoringData, setTotalMentoringData] = useState<Mentoring[] | null>(null);
    const [selectedMentoringData, setSelectedMentoringData] = useState<Mentoring | undefined>(undefined);

    useEffect(() => {
        const fetchMentoringData = async () => {
            const response = await bookingService.getMentoringData(); // mock 여부에 따라 데이터 가져옴
            if (response.success) {
                const mentorings: Mentoring[] = response.data;
                setTotalMentoringData(mentorings);
            }
        };

        fetchMentoringData();
    }, []);
    useEffect(() => {
        console.log("Selected Date:", selectedDate);
        console.log("Selected Subject: ", selectedMentoring);
    }, []);

    console.log(selectedMentoring);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);

    };

    const handleTimeSlotClick = (time: string) => {
        setBookedTimeSlot(time);
    };

    const handleSubjectClick = (id: string) => {
        setSelectedMentoring(id);
        const mentoring = totalMentoringData?.find((m) => m.id === id);
        setSelectedMentoringData(mentoring);
        if (mentoring) {
            const dates = mentoring.bookings.map((booking) => booking.date);
            setAvailableDates(dates);
        } else {
            console.error("Mentoring not found for the given ID");
        }
    }


    const bookMentoring = async () => {
        setBookingStatus('loading');
        try {
            const response = await bookingService.bookMentoring({
                subject: totalMentoringData?.[0]?.subject || '',
                date: selectedDate || '',
                timeSlot: bookedTimeSlot || '',
                studentId: 1,
            });

            if (response.success) {
                setBookingStatus('success');
            } else {
                setBookingStatus('error');
            }
        } catch {
            setBookingStatus('error');
        }
    };

    return {
        selectedMentoring,
        setSelectedMentoring,
        selectedMentoringData,
        handleSubjectClick,
        selectedDate,
        bookedTimeSlot,
        bookingStatus,
        totalMentoringData,
        availableDates,
        handleDateClick,
        handleTimeSlotClick,
        setBookingStatus,
        bookMentoring,
    };
};
