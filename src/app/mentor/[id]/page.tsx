import { mockMentors } from "@/lib/mocks/mentors";
import MentorDetailClient from "@/components/mentor/MentorDetailClient";
import { notFound } from "next/navigation";

export default function MentorDetailPage({ params }: { params: { id: string } }) {
    const mentorId = parseInt(params.id, 10);
    const mentor = mockMentors.find((mentor) => mentor.id === mentorId);

    if (!mentor) {
        return notFound(); // 404 페이지 렌더링
    }

    return (
        <div>
            <MentorDetailClient mentor={mentor} />
        </div>
    );
}
