'use client';

import { useState } from "react";
import ReviewCard from "@/components/review/ReviewCard";
import { mockReviews } from "@/lib/mocks/reviews";
import ReviewFilter from "@/components/review/ReviewFilter";

const ReviewTab = ({ reviews, rating }: { reviews: number; rating: number }) => {
    const [filteredReviews, setFilteredReviews] = useState(mockReviews);

    const handleSort = (sortType: string) => {
        const reviewsCopy = [...filteredReviews];
        if (sortType === "recent") {
            reviewsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortType === "highToLow") {
            reviewsCopy.sort((a, b) => b.rating - a.rating);
        } else if (sortType === "lowToHigh") {
            reviewsCopy.sort((a, b) => a.rating - b.rating);
        }
        setFilteredReviews(reviewsCopy);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-end justify-between gap-2">
                <div className="flex flex-row gap-2">
                    <div
                        className="w-24 h-24 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
                        <p className="text-lg font-semibold text-gray-800">평점</p>
                        <p className="text-lg font-semibold text-gray-800">{rating} / 5</p>
                    </div>
                    <div
                        className="w-24 h-24 ml-4 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
                        <p className="text-lg font-semibold text-gray-800">리뷰 수</p>
                        <p className="text-lg font-semibold text-gray-800">{reviews}개</p>
                    </div>
                </div>
                <ReviewFilter onFilter={handleSort}/>
            </div>

            {filteredReviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    userId={review.userId}
                    id={review.id}
                    rating={review.rating}
                    reviewer={review.reviewer}
                    date={review.date}
                    content={review.content}
                    categories={review.categories}
                />
            ))}
        </div>
    );
};

export default ReviewTab;
