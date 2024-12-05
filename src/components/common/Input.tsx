import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { InputProps } from "@/types/components/commonProps";

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
         className,
         error,
         fullWidth,
         helperText,
         label,
         variant = 'default',
         rounded = 'md',
         inputSize = 'md',
         disabled,
         multiline = false,
         rows = 4,
         ...props
     }, ref) => {
    const baseStyles = cn(
        'w-full border',
        'transition-colors duration-200',
        'focus-visible:outline-none',
        'text-gray-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
    );

    const variants = {
        default: 'border-gray-200 bg-white hover:border-gray-300',
        filled: 'border-transparent bg-gray-200 hover:bg-gray-300',
    };

    const roundedStyles = {
        md: 'rounded-md',
        xl: 'rounded-2xl',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-18 px-4 text-base',
    };

    if (multiline) {
        return (
            <div className={cn('grid gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label className="text-sm font-medium leading-none text-gray-700">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        baseStyles,
                        variants[variant],
                        roundedStyles[rounded],
                        sizes[inputSize],
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className,
                        'resize-none',
                        'py-3'
                    )}
                    ref={ref as React.RefObject<HTMLTextAreaElement>}
                    rows={rows}
                    disabled={disabled}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
                {helperText && (
                    <p className={cn(
                        'text-sm',
                        error ? 'text-red-500' : 'text-gray-500'
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={cn('grid gap-1.5', fullWidth && 'w-full')}>
            {label && (
                <label className="text-sm font-medium leading-none text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    baseStyles,
                    variants[variant],
                    roundedStyles[rounded],
                    sizes[inputSize],
                    error && 'border-red-500 focus-visible:ring-red-500',
                    className
                )}
                ref={ref as React.RefObject<HTMLInputElement>}
                disabled={disabled}
                {...props}
            />
            {helperText && (
                <p className={cn(
                    'text-sm',
                    error ? 'text-red-500' : 'text-gray-500'
                )}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
