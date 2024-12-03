import MentorDetailClient from "@/components/mentor/MentorDetailClient";
import { MyCalendar } from "@/components/booking/Calendar";
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
            <div className="flex w-full">
                <div className="flex-[7] min-w-[400px]">
                    <MentorDetailClient mentor={response.data}/>
                </div>
                <div className="flex-[3] min-w-[350px]">
                    <MyCalendar/>
                </div>
            </div>
        )
    } catch {
        return notFound();
    }
}
