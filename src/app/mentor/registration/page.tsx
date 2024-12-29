import MentorRegistrationForm from "@/components/mentoring/MentorRegistrationForm";

export default function MentorRegistrationPage() {
    return (
        <div className="min-h-screen bg-themeColor py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">멘토 등록</h1>
                    <p className="mt-2 text-white">개발자들의 성장을 이끌어줄 멘토가 되어주세요</p>
                </div>
                <MentorRegistrationForm />
            </div>
        </div>
    );
}