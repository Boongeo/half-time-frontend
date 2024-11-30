import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes} from "react";

/** Layout Props */
export interface LayoutProps {
    children: ReactNode;
}

export interface SideBarProps {
    id: string;
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
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
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    variant?: 'default' | 'filled';
    rounded?: 'md' | 'xl';
    inputSize?: 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    showSearchIcon?: boolean;
    options?: { label: string; value: string }[];
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    fullWidth?: boolean;
    label?: string;
    options: SelectOption[];
    inputSize?: 'sm' | 'md';
    placeholder?: string;
}

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    inputSize?: 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'md' | 'xl';
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    options?: SelectOption[];
    onOptionSelect?: (option: SelectOption) => void;
}

export interface TabsProps {
    tabs: Array<{ label: string; value: string }>;
    selectedTab: string;
    onTabSelect: (value: string) => void;
}

export interface TabProps {
    label: string;
    value: string;
    selected: boolean;
    onTabSelect: (value: string) => void;
    className?: string;
}

/** HOC props */
export interface WithAuthProps {
    requireAuth?: boolean;
    requireUnauth?: boolean;
    requireRegistration?: boolean;
}