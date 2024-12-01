export interface BookingsForDate {
    date: string; // 예약 날짜 (YYYY-MM-DD)
    bookings: Booking[]; // 해당 날짜의 예약 목록
}