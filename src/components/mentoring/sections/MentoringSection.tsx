import { useMentorRegistrationStore } from "@/store/mentor-registration";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

type MentoringType = 'online' | 'offline' | 'both';
type Region = 'seoul' | 'gyeonggi' | 'incheon' | 'busan' | 'daegu' | 'daejeon' | 'gwangju' | 'ulsan' | 'sejong' | 'remote';

const MENTORING_TYPES = [
    { value: 'online', label: '온라인 멘토링' },
    { value: 'offline', label: '오프라인 멘토링' },
    { value: 'both', label: '온/오프라인 모두 가능' }
];

const REGIONS = [
    { value: 'seoul', label: '서울' },
    { value: 'gyeonggi', label: '경기' },
    { value: 'incheon', label: '인천' },
    { value: 'busan', label: '부산' },
    { value: 'daegu', label: '대구' },
    { value: 'daejeon', label: '대전' },
    { value: 'gwangju', label: '광주' },
    { value: 'ulsan', label: '울산' },
    { value: 'sejong', label: '세종' },
    { value: 'remote', label: '상관없음' }
];

export default function MentoringSection() {
    const { form, setField } = useMentorRegistrationStore();

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">멘토링 정보</h2>
            <div className="space-y-6 text-gray-600">
                {/* 시간당 멘토링 비용 */}
                <div className="space-y-2">
                    <label htmlFor="hourlyRate">시간당 멘토링 비용</label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="hourlyRate"
                            type="number"
                            min={0}
                            step={1000}
                            className="w-32"
                            value={form.hourlyRate || 0}
                            onChange={(e) => setField('hourlyRate', Number(e.target.value))}
                        />
                        <span className="text-gray-500">원</span>
                    </div>
                </div>

                {/* 멘토링 방식 */}
                <div className="space-y-2">
                    <label htmlFor="mentoringType">선호하는 멘토링 방식</label>
                    <Select
                        id="mentoringType"
                        value={form.mentoringType || ''}
                        onChange={(e) => setField('mentoringType', e.target.value as MentoringType)}
                        options={MENTORING_TYPES}
                        placeholder="멘토링 방식을 선택해주세요"
                    />
                </div>

                {/* 선호 지역 (오프라인 멘토링 선택 시에만 표시) */}
                {(form.mentoringType === 'offline' || form.mentoringType === 'both') && (
                    <div className="space-y-2">
                        <label htmlFor="preferredRegion">선호하는 멘토링 지역</label>
                        <Select
                            id="preferredRegion"
                            value={form.preferredRegion || ''}
                            onChange={(e) => setField('preferredRegion', e.target.value as Region)}
                            options={REGIONS}
                            placeholder="선호하는 지역을 선택해주세요"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}