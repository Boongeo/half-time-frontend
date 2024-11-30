import {mentorApi} from "@/lib/api/mentor";
import MentorExploreServer from "@/components/explore/MentorExploreServer";
import MentorExploreClient from "@/components/explore/MentorExploreClient";

const USE_SERVER_COMPONENT = false;

export default async function MentorExplorePage() {
    if (USE_SERVER_COMPONENT) {
        const response = await mentorApi.getInitialMentors();
        return <MentorExploreServer initialMentors={response.data.mentors} />
    }

    return <MentorExploreClient />;
}