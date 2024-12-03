import { useState } from "react";
import { Button } from "@/components/common/Button";

const ReviewFilter = ({ onFilter }: { onFilter: (filter: string) => void }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>("recent");

    const filters = [
        { label: "최신순", value: "recent" },
        { label: "높은 평점순", value: "highToLow" },
        { label: "낮은 평점순", value: "lowToHigh" },
    ];

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        onFilter(filter); // 선택된 필터를 부모 컴포넌트로 전달
    };

    return (
        <div className="flex gap-4 mb-4">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                    className={`size-sm ${
                        selectedFilter === filter.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    } hover:bg-blue-400`}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
};

export default ReviewFilter;
