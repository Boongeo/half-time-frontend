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
                    <input
                        id="careerProof"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setField('careerProof', file);
                            }
                        }}
                        className="block w-full text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-medium
                            file:bg-gray-100 file:text-gray-700
                            hover:file:bg-gray-200"
                    />
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX 파일만 업로드 가능합니다.</p>
                </div>

                {/* 포트폴리오 URL */}
                <div className="space-y-2">
                    <label htmlFor="portfolioUrl" className="flex items-center gap-2">
                        포트폴리오 URL
                        <span className="text-sm text-gray-500">(선택사항)</span>
                    </label>
                    <Input
                        id="portfolioUrl"
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={form.portfolioUrl || ''}
                        onChange={(e) => setField('portfolioUrl', e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                        개인 웹사이트나 포트폴리오가 있다면 입력해주세요
                    </p>
                </div>

                {/* Github URL */}
                <div className="space-y-2">
                    <label htmlFor="githubUrl" className="flex items-center gap-2">
                        Github URL
                        <span className="text-sm text-gray-500">(선택사항)</span>
                    </label>
                    <Input
                        id="githubUrl"
                        type="url"
                        placeholder="https://github.com/your-username"
                        value={form.githubUrl || ''}
                        onChange={(e) => setField('githubUrl', e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                        Github 프로필이 있다면 입력해주세요
                    </p>
                </div>
            </div>
        </div>
    );
}