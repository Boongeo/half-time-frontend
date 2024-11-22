import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { SelectProps } from "@/types/props";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
   className,
   fullWidth,
   label,
   options,
   inputSize = 'md',
   disabled,
   placeholder,
   ...props
}, ref) => {
    const baseStyles = cn(
        'w-full border border-gray-200 bg-white',
        'appearance-none',
        'transition-colors duration-200',
        'focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'text-gray-400',
        'rounded-xl'
    );

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm'
    };

    return (
        <div className={cn('grid gap-1.5', fullWidth && 'w-full')}>
            {label && (
                <label className="text-sm font-medium leading-none text-gray-900">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={cn(
                        baseStyles,
                        sizes[inputSize],
                        'pr-10',
                        className
                    )}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
});

Select.displayName = 'Select';