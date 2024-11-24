import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { ButtonProps } from "@/types/commonProps";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    children,
    ...props
}, ref) => {
    const baseStyles = cn(
        'inline-flex items-center justify-center rounded-md',
        'font-arial-black',
        'transition-colors focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    );

    const variants = {
        primary: 'bg-themeColor text-white hover:bg-gray-800 focus-visible:ring-gray-950',
        secondary: 'bg-gray-100 text-themeColor hover:bg-gray-200 focus-visible:ring-gray-300',
        outline: 'border border-gray-200 bg-white text-gray-400 hover:text-themeColor focus-visible:ring-gray-300',
        ghost: 'hover:bg-gray-100 hover:text-themeColor focus-visible:ring-gray-300'
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-8 text-base'
    };

    return (
        <button
            ref={ref}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white"/>
            ) : null}
            {children}
        </button>
    );
});

Button.displayName = 'Button';