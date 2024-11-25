export interface Mentor {
    id: number;
    name: string;
    role: string;
    company: string;
    profileImage: string;
    techStack: readonly string[];
    experience: number;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    intro: string;
}
