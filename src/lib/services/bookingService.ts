import { mockMentorings } from "@/lib/mocks/mentorings";
import {bookMentoring, getMentoringList} from "@/lib/api/booking";

export class BookingService {
    private isMockMode = process.env.NEXT_PUBLIC_API_MODE === 'mock';

    async getMentoringData() {
        if (this.isMockMode) {
            return {
                success: true,
                data: mockMentorings,
            };
        }
        return await getMentoringList();
    }

    async bookMentoring(data: { subject: string; date: string; timeSlot: string; studentId: number }) {
        if (this.isMockMode) {
            const mentoring = mockMentorings.find(m => m.subject === data.subject);
            if (mentoring) {
                const booking = mentoring.bookings.find(b => b.date === data.date);
                if (booking) {
                    const timeSlot = booking.timeSlots.find(t => t.time === data.timeSlot);
                    if (timeSlot && timeSlot.students.length < 5) {  // 예약 최대 5명
                        timeSlot.students.push(data.studentId.toString());
                        return { success: true };
                    }
                }
            }
            return { success: false };
        }
        return await bookMentoring(data);
    }
}
