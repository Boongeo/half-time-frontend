// import { useState, useEffect } from "react";
// import { BookingService } from "@/lib/services/bookingService"; // 실제 서비스 사용
// import { MenteeApplication, Session } from "@/types/core/mentoring";
// import { myMenteeApplications } from "@/lib/mocks/myBookings"; // 목업 데이터
// import { mockSessions } from "@/lib/mocks/sessions";
// const bookingService = new BookingService();
//
// export const useBooking = () => {
//     // 상태 정의
//     const [applications, setApplications] = useState<MenteeApplication[]>([]);
//
//     const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//     const [totalMentoringData, setTotalMentoringData] = useState<Session[]>([]);
//
//     // 목업 데이터와 API 호출을 결합하여 데이터 로드
//     useEffect(() => {
//         const fetchMentoringData = async () => {
//             try {
//                 const response = await bookingService.getMentoringData();
//                 if (response.success) {
//                     setTotalMentoringData(response.data);
//                 } else {
//                     setTotalMentoringData(myMenteeApplications); // API 실패 시 목업 데이터 사용
//                 }
//             } catch (error) {
//                 setTotalMentoringData(myMenteeApplications); // 오류 발생 시 목업 데이터 사용
//             }
//         };
//
//         fetchMentoringData();
//     }, []);
//
//     // 상태 탭 클릭 시 상태 변경
//     const handleStatusTabClick = (status: MenteeApplication["status"]) => {
//         setSelectedStatus(status);
//     };
//
//     // 신청서 필터링
//     const filteredApplications = applications.filter(
//         (application) => application.status === selectedStatus
//     );
//
//     // 시간 슬롯 선택
//     const handleTimeSlotClick = (time: string) => {
//         setBookedTimeSlot(time);
//     };
//
//     // 멘토링 선택
//     const handleSubjectClick = (id: number) => {
//         setSelectedMentoring(id);
//         const mentoring = totalMentoringData.find((m) => m.id === id);
//         if (mentoring) {
//             setSelectedDate(mentoring.preferredDate);
//         }
//     };
//
//     // 예약 처리
//     const bookMentoring = async () => {
//         setBookingStatus('loading');
//         try {
//             const response = await bookingService.bookMentoring({
//                 subject: selectedMentoring || '',
//                 date: selectedDate || '',
//                 preferredTime: bookedTimeSlot || '',
//                 studentId: 1,
//             });
//             if (response.success) {
//                 setBookingStatus('success');
//             } else {
//                 setBookingStatus('error');
//             }
//         } catch (error) {
//             setBookingStatus('error');
//         }
//     };
//
//     return {
//         applications: filteredApplications,  // 필터링된 신청서 목록
//         selectedStatus,
//         handleStatusTabClick,
//         selectedMentoring,
//         selectedDate,
//         bookedTimeSlot,
//         bookingStatus,
//         totalMentoringData,
//         setSelectedMentoring,
//         setSelectedDate,
//         setBookedTimeSlot,
//         bookMentoring,
//         handleSubjectClick,
//         handleTimeSlotClick,
//     };
// };
