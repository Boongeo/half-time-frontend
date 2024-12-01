import {MentorSearchParams} from "@/types/shared/params";
import {mockMentors} from "@/lib/mocks/mentors";
import {mentorApi} from "@/lib/api/mentor";

export class MentorService {
    private isMockMode = process.env.NEXT_PUBLIC_API_MODE === 'mock';

    async getInitialMentors() {
        if (this.isMockMode) {
            return {
                success: true,
                data: {
                    mentors: mockMentors.slice(0, 20),
                    total: mockMentors.length
                }
            };
        }
        return await mentorApi.getInitialMentors();
    }

    async getMentorById(id: number) {
        if (this.isMockMode) {
            const mentor = mockMentors.find(mentor => mentor.id === id);
            return {
                success: true,
                data: mentor
            };
        }
        return await mentorApi.getMentor(id);
    }

    async searchMentors(params: MentorSearchParams) {
        if (this.isMockMode) {
            const filtered = this.filterMockData(mockMentors, params);
            const page = params.page || 1;
            const start = (page - 1) * 20;
            const end = Math.min(start + 20, filtered.length);

            return {
                data: {
                    mentors: filtered.slice(start, end),
                    total: filtered.length
                },
                success: true
            };
        }
        return await mentorApi.searchMentors(params);
    }

    private filterMockData(mentors: typeof mockMentors, params: MentorSearchParams) {
        return mentors.filter(mentor => {
            if (params.search) {
                const searchRegex = new RegExp(params.search, 'i');
                const searchTargets = [
                    mentor.name,
                    mentor.company,
                    mentor.interest,
                    ...mentor.techStack
                ];
                if (!searchTargets.some(target => searchRegex.test(target))) {
                    return false;
                }
            }

            if (params.techStack?.length) {
                if (!mentor.techStack.some(tech => params.techStack!.includes(tech))) {
                    return false;
                }
            }

            if (params.experience?.length) {
                const matchesExperience = params.experience.some(exp => {
                    const [min, max] = exp.split('-').map(Number);
                    return mentor.experience >= min &&
                        (max ? mentor.experience <= max : true);
                });
                if (!matchesExperience) {
                    return false;
                }
            }

            if (params.rating?.length) {
                const matchesRating = params.rating.some(rating => {
                    const minRating = parseFloat(rating);
                    return mentor.rating >= minRating;
                });
                if (!matchesRating) {
                    return false;
                }
            }

            if (params.priceMin !== undefined && mentor.hourlyRate < params.priceMin) {
                return false;
            }
            if (params.priceMax !== undefined && mentor.hourlyRate > params.priceMax) {
                return false;
            }

            return true;
        });
    }
}
