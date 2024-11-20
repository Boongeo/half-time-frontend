import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes} from "react";

/** Layout Props */
export interface LayoutProps {
    children: ReactNode;
}

export interface HeaderProps {
    showLoginButton?: boolean;
}

export interface SideBarProps {
    id: string;
    name: string;
    href: string;
    icon: string; // 이미지 경로
}

/** Components Props */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    hasLogo?: boolean;
    hasMainTitle?: boolean;
    title?: string;
    subtitle?: string;
    mainTitle?: string;
    fullWidth?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    label?: string;
    variant?: 'default' | 'filled';
    rounded?: 'md' | 'xl';
    inputSize?: 'sm' | 'md' | 'lg';
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    fullWidth?: boolean;
    label?: string;
    options: SelectOption[];
    inputSize?: 'sm' | 'md';
}