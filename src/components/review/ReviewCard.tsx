import clsx from "clsx";
import {Button} from "@/components/common/Button";
import { useUserStore } from "@/store/user";
import {ReviewCardProps} from "@/types/components/featureProps";

const ReviewCard = ({ rating, reviewer, date, content, categories, userId }: ReviewCardProps) => {
    const { user } = useUserStore();
    const isCurrentUser = user?.id === userId;

    console.log(user?.id);
    console.log(userId);

    const handleEdit = () => {
        alert('Edit review');
    };

    const handleDelete = () => {
        alert('Delete review')  ;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-gray-700 font-semibold">{reviewer}</p>
                <span className="text-sm text-gray-500">{date}</span>
            </div>
            <div className="mb-4">
                <p className="text-yellow-500 font-bold">{`⭐ ${rating} / 5`}</p>
            </div>
            <p className="text-gray-800 mb-4">{content}</p>
            <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    <span
                        key={index}
                        className={clsx(
                            "px-3 py-1 text-sm rounded-full",
                            "bg-blue-100 text-blue-800"
                        )}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* 수정/삭제 버튼 */}
            {isCurrentUser && (
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        type="submit"
                        className="w-20"
                        onClick={() => handleEdit()}
                    >수정</Button>
                    <Button
                        type="submit"
                        className="w-20"
                        onClick={() => handleDelete()}
                    >삭제</Button>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
