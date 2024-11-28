import { ExtendedFilterSectionProps } from "@/types/featureProps";
import { Button } from "../common/Button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { CheckboxGroup } from "@/components/explore/CheckboxGroup";
import { Slider } from "@/components/explore/Slider";
import { experienceOptions, ratingOptions, TECH_CATEGORIES } from "@/config/category";
import {FilterKey, TechCategories} from "@/types/category";
import { optionsMap } from "@/lib/utils/category";

export function FilterSection({
  filters,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
  onClearAll
}: ExtendedFilterSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<keyof TechCategories>(Object.keys(TECH_CATEGORIES)[0]);
    const hasSelectedFilters = Object.values(filters).some(values => values.length > 0) || priceRange[0] > 0 || priceRange[1] < 100000;

    const handleClearFilter = (key: FilterKey, value: string) => {
        onFilterChange(key, filters[key].filter(v => v !== value));
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
                        {/* 가격 범위 배지 */}
                        {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                                <span>
                                    {priceRange[0].toLocaleString()}원 - {priceRange[1].toLocaleString()}원
                                </span>
                            </div>
                        )}
                        <button
                            className="text-sm text-gray-500 hover:text-gray-700"
                            onClick={onClearAll}
                        >
                            초기화
                        </button>
                    </div>
                )}
            </div>

            {/* 필터 컨테이너 */}
            {isOpen && (
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-6">
                        {/* 1열: 기술 스택 대분류 */}
                        <div className="space-y-2 border-r pr-4">
                            <label className="text-sm font-medium text-gray-700 ml-2">개발 분야</label>
                            <div className="space-y-1">
                                {Object.keys(TECH_CATEGORIES).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                            selectedCategory === category
                                                ? "bg-gray-100 text-gray-900 font-medium"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2열: 선택된 대분류의 기술 스택 필터 */}
                        <CheckboxGroup
                            label="기술 스택"
                            options={TECH_CATEGORIES[selectedCategory]}
                            selectedValues={filters.techStack}
                            onChange={(values) => onFilterChange('techStack', values)}
                            maxHeight="190px"
                        />

                        {/* 3열: 경력 필터 */}
                        <CheckboxGroup
                            label="경력"
                            options={experienceOptions}
                            selectedValues={filters.experience}
                            onChange={(values) => onFilterChange('experience', values)}
                        />

                        {/* 4열: 평점 필터 */}
                        <CheckboxGroup
                            label="평점"
                            options={ratingOptions}
                            selectedValues={filters.rating}
                            onChange={(values) => onFilterChange('rating', values)}
                        />

                        {/* 5열: 가격 필터 & 필터 적용 버튼 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">가격 범위</label>
                            <div className="px-2">
                                <Slider
                                    value={priceRange}
                                    onValueChange={onPriceRangeChange}
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
                            <div className="pt-28">
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