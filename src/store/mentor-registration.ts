import {MentorRegistrationForm, MentorRegistrationStore, RegistrationStatus} from "@/types/core/mentor";
import {create} from "zustand";
import {mentorRegistrationApi} from "@/lib/api/mentor-registration";

const initialForm: Partial<MentorRegistrationForm> = {
    company: '',
    experience: 0,
    techStack: [],
    interest: '',
    intro: '',
    hourlyRate: 0,
    mentoringType: 'online',
    preferredRegion: undefined,
    careerProof: null,
    portfolioUrl: '',
    githubUrl: '',
};

export const useMentorRegistrationStore = create<MentorRegistrationStore>((set, get) => ({
    form: initialForm,
    currentStep: 1,
    isLoading: false,
    selectedCategory: '',
    registrationStatus: null as RegistrationStatus | null,

    setField: (field, value) => set((state) => ({
        form: {
            ...state.form,
            [field]: value
        }
    })),

    setCurrentStep: (step) => set({ currentStep: step }),

    setLoading: (isLoading) => set({ isLoading }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setRegistrationStatus: (status) => set({ registrationStatus: status }),

    resetForm: () => set({
        form: initialForm,
        currentStep: 1,
        selectedCategory: '',
        registrationStatus: null
    }),

    validateCurrentStep: () => {
        const { currentStep, form } = get();

        switch (currentStep) {
            case 1: // Professional Section
                if (!form.company?.trim()) {
                    return { isValid: false, message: '회사명을 입력해주세요' };
                }
                if (form.experience === undefined || form.experience < 0) {
                    return { isValid: false, message: '올바른 경력을 입력해주세요' };
                }
                if (!form.techStack?.length) {
                    return { isValid: false, message: '최소 1개 이상의 기술 스택을 선택해주세요' };
                }
                if (!form.interest?.trim()) {
                    return { isValid: false, message: '관심 분야를 입력해주세요' };
                }
                if (!form.intro?.trim() || form.intro.length < 30) {
                    return { isValid: false, message: '자기소개를 30자 이상 작성해주세요' };
                }
                return { isValid: true, message: '' };

            case 2: // Mentoring Section
                if (!form.hourlyRate || form.hourlyRate < 0) {
                    return { isValid: false, message: '올바른 멘토링 비용을 입력해주세요' };
                }
                if (!form.mentoringType) {
                    return { isValid: false, message: '선호하는 멘토링 방식을 선택해주세요' };
                }
                if ((form.mentoringType === 'offline' || form.mentoringType === 'both') && !form.preferredRegion) {
                    return { isValid: false, message: '선호하는 멘토링 지역을 선택해주세요' };
                }
                return { isValid: true, message: '' };


            case 3: // Verification Section
                if (!form.careerProof) {
                    return { isValid: false, message: '경력 증명서를 업로드해주세요' };
                }
                if (form.portfolioUrl && !form.portfolioUrl.startsWith('https://')) {
                    return { isValid: false, message: '올바른 포트폴리오 URL을 입력해주세요' };
                }
                if (form.githubUrl && !form.githubUrl.startsWith('https://github.com/')) {
                    return { isValid: false, message: '올바른 Github URL을 입력해주세요' };
                }
                return { isValid: true, message: '' };

            default:
                return { isValid: false, message: '알 수 없는 오류가 발생했습니다.' };
        }
    },

    submitRegistration: async () => {
        const { form, setLoading } = get();

        try {
            setLoading(true);

            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (key === 'careerProof') return;
                if (Array.isArray(value)) {
                    value.forEach(v => formData.append(`${key}[]`, v));
                } else if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });

            if (form.careerProof) {
                formData.append('careerProof', form.careerProof);
            }

            const response = await mentorRegistrationApi.register(formData);

            if (response.success) {
                set({ registrationStatus: 'pending' });
            }
        } catch (error) {
            console.error('멘토 등록 실패: ', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }
}));