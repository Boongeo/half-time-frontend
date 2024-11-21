import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { InputProps } from "@/types/props";
import Image from "next/image";

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
         showSearchIcon = false,
         options = [],
         ...props
     }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

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

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const paddingStyles = 'px-4 py-2';

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
                        paddingStyles,
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className,
                        'resize-none'
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
        <div className={cn('relative grid gap-1.5', fullWidth && 'w-full')}>
            {label && (
                <label className="text-sm font-medium leading-none text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {showSearchIcon && !multiline && (
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Image
                            src="/icons/search-icon.png"
                            alt="Search Icon"
                            width={15}
                            height={15}
                            className="text-gray-400"
                        />
                    </div>
                )}
                <input
                    className={cn(
                        baseStyles,
                        variants[variant],
                        roundedStyles[rounded],
                        sizes[inputSize],
                        showSearchIcon ? 'pl-10' : 'px-4',
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className
                    )}
                    ref={ref as React.RefObject<HTMLInputElement>}
                    disabled={disabled}
                    readOnly={showSearchIcon}
                    value={selectedValue}
                    onClick={handleInputClick}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
                {isOpen && showSearchIcon && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionSelect(option.label)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                                No options available
                            </div>
                        )}
                    </div>
                )}
            </div>
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
