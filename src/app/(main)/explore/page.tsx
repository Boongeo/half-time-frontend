import MentorExplore from "@/components/explore/MentorExplore";
import { MentorService } from "@/lib/services/mentorService";

export default async function MentorExplorePage() {
    const mentorService = new MentorService();
    const initialData = await mentorService.getInitialMentors();
    return <MentorExplore initialData={initialData} />;
}