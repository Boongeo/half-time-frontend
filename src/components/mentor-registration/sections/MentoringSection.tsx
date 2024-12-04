import {useMentorRegistrationStore} from "@/store/mentor-registration";
import {Input} from "@/components/common/Input";
import {Select} from "@/components/common/Select";

export default function MentoringSection() {
    const { form, setField } = useMentorRegistrationStore();

    const timeSlots = Array.from({ length: 24 }, (_, i) =>
        `${String(i).padStart(2, '0')}:00`
    );

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

                {/* 멘토링 가능 시간 */}
                <div className="space-y-2">
                    <label>멘토링 가능 시간</label>
                    <div className="space-y-4">
                        {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                            <div key={day} className="flex items-center gap-4">
                                <span className="w-16">{day}요일</span>
                                <Select
                                    className="w-32"
                                    options={timeSlots.map(time => ({
                                        value: time,
                                        label: time
                                    }))}
                                    value={form.availableTime?.[index]?.times[0] || ''}
                                    onChange={(e) => {
                                        const newAvailableTime = [...(form.availableTime || [])];
                                        newAvailableTime[index] = {
                                            day,
                                            times: [e.target.value]
                                        };
                                        setField('availableTime', newAvailableTime);
                                    }}
                                    inputSize="md"
                                    placeholder="시작 시간"
                                />
                                <span>~</span>
                                <Select
                                    className="w-32"
                                    options={timeSlots.map(time => ({
                                        value: time,
                                        label: time
                                    }))}
                                    value={form.availableTime?.[index]?.times[1] || ''}
                                    onChange={(e) => {
                                        const newAvailableTime = [...(form.availableTime || [])];
                                        if (newAvailableTime[index]) {
                                            newAvailableTime[index].times[1] = e.target.value;
                                            setField('availableTime', newAvailableTime);
                                        }
                                    }}
                                    inputSize="md"
                                    placeholder="종료 시간"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}