import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tag' | 'selected';
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
    value?: string | number | readonly string[];
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

export interface InfiniteScrollTriggerProps {
    onIntersectAction: () => void;
    enabled?: boolean;
}
