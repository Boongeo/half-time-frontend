import {CheckboxGroupProps} from "@/types/props";
import {cn} from "@/lib/utils/cn";

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  gridLayout = false,
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
                    gridLayout && maxHeight && "overflow-y-auto",
                    gridLayout ? "grid grid-cols-2 auto-rows-min gap-2" : "space-y-2"
                )}
                style={maxHeight ? {maxHeight} : undefined}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={cn(
                            "flex items-center gap-2 cursor-pointer",
                            gridLayout && "min-w-[120px]"
                        )}
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