import {CheckboxGroupProps} from "@/types/props";

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  gridLayout = false
}: CheckboxGroupProps) {
    const shouldScroll = options.length > 8;
    const maxHeight = gridLayout ? "320px" : "240px";

    const handleChange = (value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newValues);
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div
                className={`
                    ${gridLayout ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}
                    ${shouldScroll ? `overflow-y-auto max-h-[${maxHeight}] pr-2
                        [&::-webkit-scrollbar]:w-2 
                        [&::-webkit-scrollbar-track]:bg-gray-100 
                        [&::-webkit-scrollbar-thumb]:bg-gray-300 
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-track]:rounded-full
                    ` : ''}
                `}
            >

                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
                            checked={selectedValues.includes(option.value)}
                            onChange={() => handleChange(option.value)}
                        />
                        <span className="text-sm text-gray-600">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}