import { v4 as uuidv4 } from 'uuid';
import {Mentoring} from '@/types/core/mentoring';

export const mockMentorings: Mentoring[] = [
    {
        id: uuidv4(),
        subject: "프론트엔드 개발",
        language: "Javascript",
        location: "서울 강남역 2번 출구",
        method: "offline",
        bookings: [
            {
                date: "2024-12-05",
                timeSlots: [
                    { time: "10:00 AM", students: ["홍길동", "박유주"] },
                    { time: "02:00 PM", students: ["이혜린", "전병준"] },
                    { time: "04:00 PM", students: [] },
                ],
            },
            {
                date: "2024-12-12",
                timeSlots: [
                    { time: "09:00 AM", students: ["홍길동"] },
                    { time: "03:00 PM", students: [] },
                ],
            },
            {
                date: "2024-12-19",
                timeSlots: [
                    { time: "01:00 PM", students: ["박유주", "전병준"] },
                    { time: "05:00 PM", students: [] },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        subject: "데이터베이스 관리",
        language: "SQL",
        location: "서울 강남역 2번 출구",
        method: "online",
        bookings: [
            {
                date: "2024-12-10",
                timeSlots: [
                    { time: "10:00 AM", students: ["이혜린"] },
                    { time: "01:00 PM", students: ["홍길동"] },
                ],
            },
            {
                date: "2024-12-15",
                timeSlots: [
                    { time: "11:00 AM", students: [] },
                    { time: "04:00 PM", students: ["박유주", "전병준"] },
                ],
            },
        ],
    },

    {
        id: uuidv4(),
        subject: "백엔드 개발",
        language: "Java",
        location: "서울 강남역 2번 출구",
        method: "offline",
        bookings: [
            {
                date: "2024-12-08",
                timeSlots: [
                    { time: "09:00 AM", students: ["이혜린"] },
                    { time: "02:00 PM", students: ["홍길동", "전병준"] },
                ],
            },
            {
                date: "2024-12-14",
                timeSlots: [
                    { time: "01:00 PM", students: [] },
                    { time: "04:00 PM", students: ["박유주"] },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        subject: "프론트엔드 개발",
        language: "Javascript",
        location: "서울 강남역 2번 출구",
        method: "offline",
        bookings: [
            {
                date: "2024-12-05",
                timeSlots: [
                    { time: "10:00 AM", students: ["홍길동", "박유주"] },
                    { time: "02:00 PM", students: ["이혜린", "전병준"] },
                    { time: "04:00 PM", students: [] },
                ],
            },
            {
                date: "2024-12-12",
                timeSlots: [
                    { time: "09:00 AM", students: ["홍길동"] },
                    { time: "03:00 PM", students: [] },
                ],
            },
            {
                date: "2024-12-19",
                timeSlots: [
                    { time: "01:00 PM", students: ["박유주", "전병준"] },
                    { time: "05:00 PM", students: [] },
                ],
            },
        ],
    },
];
