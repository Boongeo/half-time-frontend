import {Input} from "@/components/common/Input";
import {Select} from "@/components/common/Select";
import {useMentorRegistrationStore} from "@/store/mentor-registration";
import {TECH_CATEGORIES} from "@/config/category";
import {Button} from "@/components/common/Button";

export default function ProfessionalSection() {
    const { form, setField, selectedCategory, setSelectedCategory } = useMentorRegistrationStore();
    const categoryOptions = Object.keys(TECH_CATEGORIES).map(category => ({
        value: category,
        label: category
    }));

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setField('interest', category);
        setField('techStack', []);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">전문 분야</h2>
            <div className="space-y-6 text-gray-600">
                {/* 회사 */}
                <div className="space-y-2">
                    <label htmlFor="company">회사</label>
                    <Input
                        id="company"
                        placeholder="현재 재직중인 회사명"
                        value={form.company || ''}
                        onChange={(e) => setField('company', e.target.value)}
                    />
                </div>

                {/* 경력 */}
                <div className="space-y-2">
                    <label htmlFor="experience">경력</label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="experience"
                            type="number"
                            min={0}
                            className="w-32"
                            value={form.experience || 0}
                            onChange={(e) => setField('experience', Number(e.target.value))}
                        />
                        <span className="text-gray-500">년</span>
                    </div>
                </div>

                {/* 관심 분야 */}
                <div className="space-y-2">
                    <label htmlFor="interest">관심 분야</label>
                    <Select
                        id="interest"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        options={categoryOptions}
                        placeholder="관심 분야를 선택해주세요"
                    />
                </div>

                {/* 기술 스택 */}
                <div className="space-y-2">
                    <label htmlFor="techStack">기술 스택</label>
                    {selectedCategory ? (
                        <div className="flex flex-wrap gap-2 text-xs font-sans">
                            {TECH_CATEGORIES[selectedCategory].map((tech) => {
                                const isSelected = (form.techStack || []).includes(tech.value);
                                return (
                                    <Button
                                        key={tech.value}
                                        onClick={() => {
                                            const currentTechStack = form.techStack || [];
                                            if (currentTechStack.includes(tech.value)) {
                                                setField('techStack', currentTechStack.filter(item => item !== tech.value));
                                            } else {
                                                setField('techStack', [...currentTechStack, tech.value]);
                                            }
                                        }}
                                        variant={isSelected ? 'selected' : 'tag'}
                                        size="sm"
                                        style={{ fontSize: '12px' }}
                                    >
                                        {tech.label}
                                    </Button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">관심 분야를 먼저 선택해주세요</p>
                    )}
                </div>

                {/* 자기 소개 */}
                <div className="space-y-2">
                    <label htmlFor="intro">자기 소개</label>
                    <Input
                        multiline={true}
                        rows={5}
                        inputSize="xl"
                        type="text"
                        placeholder="Introduce yourself"
                        className="w-full"
                        value={form.intro}
                        onChange={(e) => setField("intro", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}