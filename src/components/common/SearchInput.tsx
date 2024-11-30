import {Search} from "lucide-react";
import {Input} from "@/components/common/Input";
import {forwardRef, useState} from "react";
import {SearchInputProps, SelectOption} from "@/types/components/commonProps";
import {cn} from "@/lib/utils/cn";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
   className,
   inputSize = 'md',
   rounded = 'md',
   fullWidth = false,
   error,
   helperText,
   options = [],
   onOptionSelect,
   ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleInputClick = () => {
        if (options.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionSelect = (option: SelectOption) => {
        onOptionSelect?.(option);
        setIsOpen(false);
    };

    return (
        <div className={cn('relative', fullWidth && 'w-full')}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none z-10" />
                <Input
                    ref={ref}
                    className={cn('pl-10', className)}
                    inputSize={inputSize}
                    rounded={rounded}
                    fullWidth={fullWidth}
                    error={error}
                    helperText={helperText}
                    onClick={handleInputClick}
                    {...props}
                />
            </div>

            {isOpen && options.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

SearchInput.displayName = 'SearchInput';