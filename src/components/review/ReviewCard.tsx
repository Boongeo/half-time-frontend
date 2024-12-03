import clsx from "clsx";
import { Button } from "@/components/common/Button";
import { useTestUserStore } from "@/store/testUser";
import { useState, useEffect } from "react";
import { category } from "@/config/category";
import { ReviewCardProps } from "@/types/components/mentorProps";
import { Modal } from "@/components/common/Modal";

const ReviewCard = ({
                        rating,
                        reviewer,
                        date,
                        content,
                        categories,
                        userId,
                    }: ReviewCardProps) => {
    const { user } = useTestUserStore();
    const isCurrentUser = user?.id === userId;

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [editRating, setEditRating] = useState(rating);
    const [editCategories, setEditCategories] = useState<string[]>(categories);

    const [isDelete, setIsDelete] = useState(false);

    console.log(editCategories);
    // 카테고리가 변경될 때 editCategories에 반영
    useEffect(() => {
        setEditCategories(categories);
    }, [categories]);

    const handleSave = () => {
        // 저장 로직 추가
        console.log("Updated content:", editContent);
        console.log("Updated rating:", editRating);
        console.log("Updated categories:", editCategories);
        setIsEditing(false);
    };

    const handleDelete = () => {
        // 삭제 로직 추가
        setIsDelete(false);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-gray-700 font-semibold">{reviewer}</p>
                <span className="text-sm text-gray-500">{date}</span>
            </div>

            {/* 별점 수정 */}
            <div className="mb-4">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setEditRating(star)}
                                className={clsx(
                                    "text-xl",
                                    editRating >= star ? "text-yellow-500" : "text-gray-300"
                                )}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-yellow-500 font-bold">{`⭐ ${rating} / 5`}</p>
                )}
            </div>

            {/* 텍스트 수정 */}
            {isEditing ? (
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-gray-800 resize-none"
                />
            ) : (
                <p className="text-gray-800 mb-4">{content}</p>
            )}

            {/* 카테고리 수정 */}
            <div className="flex flex-wrap gap-2 mb-4">
                {isEditing ? (
                    category.map((category) => (
                        <button
                            key={category.value}
                            onClick={() =>
                                setEditCategories((prev) =>
                                    prev.includes(category.value)
                                        ? prev.filter((c) => c !== category.value)
                                        : [...prev, category.value]
                                )
                            }
                            className={clsx(
                                "px-3 py-1 text-sm rounded-full border",
                                editCategories.includes(category.value)
                                    ? "bg-blue-100 text-blue-800 border-blue-800"
                                    : "bg-gray-100 text-gray-800 border-gray-300"
                            )}
                        >
                            {category.label}
                        </button>
                    ))
                ) : (
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
                )}
            </div>

            {/* 수정/저장 버튼 */}
            {isCurrentUser && (
                <div className="flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <Button className="w-20" onClick={() => setIsEditing(false)}>
                                취소
                            </Button>
                            <Button className="w-20" onClick={handleSave}>
                                저장
                            </Button>
                        </>
                    ) : isDelete ? (
                        <Modal
                            isOpen={true}
                            onClose={() => setIsDelete(false)}
                            title="리뷰를 삭제하겠습니까?"
                            description="삭제한 후에는 복원할 수 없습니다."
                        >
                            <div className="flex justify-end items-center px-4 gap-2">
                                <Button className="w-20" onClick={() => setIsDelete(false)}>
                                    취소
                                </Button>
                                <Button className="w-20" onClick={handleDelete}>
                                    삭제
                                </Button>
                            </div>
                        </Modal>
                    ) : (
                        <div className="flex justify-end items-center px-4 gap-2">
                            <Button className="w-20" onClick={() => setIsEditing(true)}>
                                수정
                            </Button>
                            <Button className="w-20" onClick={() => setIsDelete(true)}>
                                삭제
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
