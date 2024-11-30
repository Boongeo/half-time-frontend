import { SideBarProps } from "@/types/components/commonProps";
import {Compass, Home, MessageSquare, User, CalendarCheck2} from "lucide-react";

export const sideItems: SideBarProps[] = [
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
