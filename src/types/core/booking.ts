export interface Booking {
    id: string; // 예약 아이디
    mentor: string; // 멘토 이름
    language: string; // 언어
    time: string; // 예약 시간
    status: "Confirmed" | "Ongoing" | "Cancelled" | "Pending" | "Completed"; // 예약 상태
    subject: string; // 과목
    student: string; // 학생 이름
    location: string; // 장소
    method: "offline" | "online"; // 예약 방식 (대면, 온라인 등)
}

export interface BookingsForDate {
    date: string; // 예약 날짜 (YYYY-MM-DD)
    bookings: Booking[]; // 해당 날짜의 예약 목록
}

