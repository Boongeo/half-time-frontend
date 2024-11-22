import {SearchSectionProps} from "@/types/props";
import {SearchInput} from "@/components/common/SearchInput";

export function SearchSection({ value, onChange }: SearchSectionProps) {
    return (
        <div className="w-full">
            <SearchInput
                placeholder="멘토 이름, 기술 스택으로 검색하기"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                inputSize="lg"
                rounded="xl"
                fullWidth
            />
        </div>
    );
}