import {ReactNode} from "react";

export interface LayoutProps {
    children: ReactNode;
}

export interface SideBarProps {
    id: string;
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}