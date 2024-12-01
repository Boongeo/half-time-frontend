import MentorDetailClient from "@/components/mentor/MentorDetailClient";
import { notFound } from "next/navigation";
import {MentorService} from "@/lib/services/mentorService";

export default async function MentorDetailPage(props: { params: { id: string } }) {
    const params = await props.params;
    const mentorService = new MentorService();
    const mentorId = Number(params.id);

    try {
        const response = await mentorService.getMentorById(mentorId);
        if (!response.success || !response.data) {
            return notFound();
        }

        return (
            <div>
                <MentorDetailClient mentor={response.data} />
            </div>
        )
    } catch {
        return notFound();
    }
}
