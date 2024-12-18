import {
    Compass,
    Home,
    MessageSquare,
    User,
    CalendarCheck2,
    LayoutDashboard,
    Calendar,
    Users,
    Clock,
    FileText,
    BarChart3, Settings
} from "lucide-react";
import {SideBarProps} from "@/types/components/layoutProps";

export const defaultSideItems: SideBarProps[] = [
    {
        id: "home",
        name: "Home",
        href: "/",
        icon: Home
    },
    {
        id: "message",
        name: "Message",
        href: "/chat",
        icon: MessageSquare
    },
    {
        id: "explore",
        name: "Explore",
        href: "/explore",
        icon: Compass
    },
    {
        id: "booking",
        name: "Booking",
        href: "/booking",
        icon: CalendarCheck2
    },
    {
        id: "mypage",
        name: "MyPage",
        href: "/mypage",
        icon: User
    },
];

export const mentorSideItems: SideBarProps[] = [
    {
        id: 'dashboard',
        name: '대시보드',
        href: '/mentor/dashboard',
        icon: LayoutDashboard
    },
    {
        id: 'schedule',
        name: '일정',
        href: '/mentor/schedule',
        icon: Calendar
    },
    {
        id: 'sessions',
        name: '멘토링',
        href: '/mentor/sessions',
        icon: Users
    },
    {
        id: 'availability',
        name: '시간 관리',
        href: '/mentor/availability',
        icon: Clock
    },
    {
        id: 'reviews',
        name: '리뷰',
        href: '/mentor/reviews',
        icon: FileText
    },
    {
        id: 'earnings',
        name: '수익',
        href: '/mentor/earnings',
        icon: BarChart3
    },
    {
        id: 'settings',
        name: '설정',
        href: '/mentor/settings',
        icon: Settings
    },
]
