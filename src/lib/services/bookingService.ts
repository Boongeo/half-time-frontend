import { mockSessions } from "@/lib/mocks/sessions";
import { myMenteeApplications } from "@/lib/mocks/myBookings";
import {getMentoringList, getBookingList} from "@/lib/api/booking";

type BookMentoringResponse = {
    success: boolean;
    message?: string;
};

// bookingService.ts
export class BookingService {
    private isMockMode = process.env.NEXT_PUBLIC_API_MODE === 'mock';

    // 멘토가 열어둔 멘토링을 가져오는 api
    async getMentoringData() {
        if (this.isMockMode) {
            return {
                success: true,
                data: mockSessions,
            };
        }
        return await getMentoringList();
    }

    // 멘토링을 신청하는 api
    async bookMentoring(data: { subject: string; date: string; timeSlot: string; studentId: number }): Promise<BookMentoringResponse> {
        if (this.isMockMode) {
            const mentoring = mockSessions.find(m => m.title === data.subject); // 제목으로 멘토링을 찾음
            if (mentoring) {
                console.log(`멘토링 신청 성공: ${data.subject} - ${data.date} ${data.timeSlot}`);
                return { success: true };  // 성공적으로 신청이 되었음을 응답
            } else {
                return { success: false, message: "해당 과목에 대한 멘토링이 없습니다." };
            }
        }
        // Mock이 아닌 경우 실제 예약 처리 함수 호출
        return await this.bookMentoring(data); // 실제 서버로 예약 요청
    }

    // 내가 신청한 멘토링 내역을 보는 api
    async getBookingData(status?: string) {
        if (this.isMockMode) {
            return {
                success: true,
                data: myMenteeApplications,
            };
        }
        return await getBookingList(status);
    }
}