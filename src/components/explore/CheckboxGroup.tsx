import {CheckboxGroupProps} from "@/types/featureProps";
import {cn} from "@/lib/utils/cn";

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  maxHeight
}: CheckboxGroupProps) {
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
                className={cn(
                    "space-y-2",
                    maxHeight && "overflow-y-auto"
                )}
                style={maxHeight ? {maxHeight} : undefined}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
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