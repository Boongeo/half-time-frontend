import {FilterSectionProps} from "@/types/props";
import {Select} from "@/components/common/Select";

const techStackOptions = [
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
];

const experienceOptions = [
    { value: '0-3', label: '0-3년' },
    { value: '3-5', label: '3-5년' },
    { value: '5-10', label: '5-10년' },
    { value: '10+', label: '10년 이상' },
];

const ratingOptions = [
    { value: '4+', label: '4.0 이상' },
    { value: '3+', label: '3.0 이상' },
    { value: 'all', label: '전체' },
];

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
                label="기술 스택"
                options={techStackOptions}
                value={filters.techStack}
                onChange={(e) => onFilterChange('techStack', e.target.value)}
                placeholder="기술 선택"
            />
            <Select
                label="경력"
                options={experienceOptions}
                value={filters.experience}
                onChange={(e) => onFilterChange('experience', e.target.value)}
                placeholder="경력 선택"
            />
            <Select
                label="평점"
                options={ratingOptions}
                value={filters.rating}
                onChange={(e) => onFilterChange('rating', e.target.value)}
                placeholder="평점 선택"
            />
        </div>
    );
}