import {Input} from "@/components/common/Input";
import {useMentorRegistrationStore} from "@/store/mentor-registration";

export default function VerificationSection() {
    const { form, setField } = useMentorRegistrationStore();

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">인증 정보</h2>
            <div className="space-y-6 text-gray-600">
                {/* 경력 증명서 */}
                <div className="space-y-2">
                    <label htmlFor="careerProof">경력 증명서</label>
                    <Input
                        id="careerProof"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setField('careerProof', file);
                            }
                        }}
                    />
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX 파일만 업로드 가능합니다.</p>
                </div>

                {/* 포트폴리오 URL */}
                <div className="space-y-2">
                    <label htmlFor="portfolioUrl">포트폴리오 URL</label>
                    <Input
                        id="portfolioUrl"
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={form.portfolioUrl || ''}
                        onChange={(e) => setField('portfolioUrl', e.target.value)}
                    />
                </div>

                {/* Github URL */}
                <div className="space-y-2">
                    <label htmlFor="githubUrl">Github URL</label>
                    <Input
                        id="githubUrl"
                        type="url"
                        placeholder="https://github.com/your-username"
                        value={form.githubUrl || ''}
                        onChange={(e) => setField('githubUrl', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}