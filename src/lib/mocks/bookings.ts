import { BookingsForDate } from '@/types/booking';
import { v4 as uuidv4 } from 'uuid';

export const mockBookings: BookingsForDate[] = [
    {
        date: "2024-11-30", // 날짜
        bookings: [
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "김지훈",
                language: "한국어",
                time: "2024-12-01 10:00 AM",
                status: "Confirmed", // 예약 완료 (확정)
                subject: "React 프로젝트 코드 리뷰",
                student: "홍길동",
                location: "서울 강남역 2번 출구",
                method: "대면",
            },
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "이수민",
                language: "영어",
                time: "2024-12-01 02:00 PM",
                status: "Confirmed", // 예약 완료 (확정)
                subject: "JavaScript 심화",
                student: "박지훈",
                location: "Zoom",
                method: "온라인",
            },
        ],
    },
    {
        date: "2024-12-02",
        bookings: [
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "한지현",
                language: "영어",
                time: "2024-12-02 09:00 AM",
                status: "Ongoing", // 진행 중
                subject: "Node.js 기본",
                student: "최은지",
                location: "Zoom",
                method: "온라인",
            },
        ],
    },
    {
        date: "2024-12-03",
        bookings: [
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "박정은",
                language: "프랑스어",
                time: "2024-12-03 11:00 AM",
                status: "Cancelled", // 취소됨
                subject: "프랑스어 기초",
                student: "김민재",
                location: "서울 역삼동 카페",
                method: "대면",
            },
        ],
    },
    {
        date: "2024-12-04",
        bookings: [
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "이상우",
                language: "일본어",
                time: "2024-12-04 03:00 PM",
                status: "Pending", // 대기 중
                subject: "일본어 회화",
                student: "장희진",
                location: "Zoom",
                method: "온라인",
            },
        ],
    },
    {
        date: "2024-12-05",
        bookings: [
            {
                id: uuidv4(), // 자동 생성된 고유 ID
                mentor: "서지현",
                language: "스페인어",
                time: "2024-12-05 01:00 PM",
                status: "Completed", // 완료됨
                subject: "스페인어 문법",
                student: "김현수",
                location: "서울 시청 근처 카페",
                method: "대면",
            },
        ],
    },
];
