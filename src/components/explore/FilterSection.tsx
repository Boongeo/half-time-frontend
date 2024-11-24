import { FilterKey, FilterSectionProps } from "@/types/props";
import { Button } from "../common/Button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { CheckboxGroup } from "@/components/explore/CheckboxGroup";
import { experienceOptions, optionsMap, ratingOptions, techStackOptions } from "@/config/filter";
import {Slider} from "@/components/explore/Slider";

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const hasSelectedFilters = Object.values(filters).some(values => values.length > 0);

    const handleClearFilter = (key: FilterKey, value: string) => {
        onFilterChange(key, filters[key].filter(v => v !== value));
    };

    const handleClearAll = () => {
        Object.keys(filters).forEach(key => {
            onFilterChange(key as FilterKey, []);
        });
        setPriceRange([0, 100000]);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {/* 필터 버튼 */}
                <Button
                    variant="outline"
                    className={cn(
                        "flex items-center gap-2 whitespace-nowrap text-gray-500",
                        isOpen && "bg-gray-100"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>필터</span>
                </Button>

                {/* 선택된 필터 배지들 */}
                {hasSelectedFilters && (
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, values]) =>
                            values.map((value: string) => {
                                const label = optionsMap[key as FilterKey].find(opt => opt.value === value)?.label;
                                if (!label) return null;
                                return (
                                    <div
                                        key={`${key}-${value}`}
                                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-500"
                                    >
                                        <span>{label}</span>
                                        <button
                                            className="p-0.5 hover:bg-gray-200 rounded-full"
                                            onClick={() => handleClearFilter(key as FilterKey, value)}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                        <button
                            className="text-sm text-gray-500 hover:text-gray-700"
                            onClick={handleClearAll}
                        >
                            초기화
                        </button>
                    </div>
                )}
            </div>

            {/* 필터 컨테이너 */}
            {isOpen && (
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-6">
                        <CheckboxGroup
                            label="기술 스택"
                            options={techStackOptions}
                            selectedValues={filters.techStack}
                            onChange={(values) => onFilterChange('techStack', values)}
                            gridLayout={true}
                            maxHeight="120px"
                        />
                        <CheckboxGroup
                            label="경력"
                            options={experienceOptions}
                            selectedValues={filters.experience}
                            onChange={(values) => onFilterChange('experience', values)}
                        />
                        <CheckboxGroup
                            label="평점"
                            options={ratingOptions}
                            selectedValues={filters.rating}
                            onChange={(values) => onFilterChange('rating', values)}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">가격 범위</label>
                            <div className="px-2">
                                <Slider
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    min={0}
                                    max={100000}
                                    step={1000}
                                    className="mb-2"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{priceRange[0].toLocaleString()}원</span>
                                    <span>{priceRange[1].toLocaleString()}원</span>
                                </div>
                            </div>
                            <div className="pt-10">
                                <Button
                                    className="w-full"
                                >
                                    필터 적용
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}