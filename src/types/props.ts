import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes} from "react";
import {LucideIcon} from "lucide-react";
import {PasswordValidation} from "@/types/auth";
import {Mentor} from "@/lib/mocks/mentors";

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

/** Auth Props */
export interface SocialLoginButtonProps {
    provider: string;
    icon: LucideIcon | string;
    children: React.ReactNode;
}

export interface PasswordRequirementsProps {
    validation: PasswordValidation;
}

export interface PasswordMatchProps {
    isMatching: boolean;
    show: boolean;
}

/** Explore Props */
export interface MentorCardProps {
    mentor: Mentor;
}

export interface SearchSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export type FilterKey = 'techStack' | 'experience' | 'rating';

export type FilterOption = {
    value: string;
    label: string;
};

export interface FilterValues {
    techStack: string[];
    experience: string[];
    rating: string[];
}

export interface FilterSectionProps {
    filters: FilterValues;
    onFilterChange: (field: FilterKey, value: string[]) => void;
}

export interface CheckboxGroupProps {
    label: string;
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    maxHeight?: string;
    gridLayout?: boolean;
}
