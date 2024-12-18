import {
    Compass,
    Home,
    MessageSquare,
    User,
    CalendarCheck2,
    LayoutDashboard,
    Users,
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
        name: 'Dashboard',
        href: '/mentor/dashboard',
        icon: LayoutDashboard
    },
    {
        id: 'sessions',
        name: 'Sessions',
        href: '/mentor/sessions',
        icon: Users
    },
    {
        id: 'reviews',
        name: 'Reviews',
        href: '/mentor/reviews',
        icon: FileText
    },
    {
        id: 'earnings',
        name: 'Earnings',
        href: '/mentor/earnings',
        icon: BarChart3
    },
    {
        id: 'settings',
        name: 'Settings',
        href: '/mentor/settings',
        icon: Settings
    },
]
