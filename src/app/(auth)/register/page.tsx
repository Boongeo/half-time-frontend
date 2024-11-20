'use client';

import { useRegister } from "@/lib/hooks/useRegister";
import { withAuth } from "@/lib/auth/withAuth";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import Image from "next/image";

function RegisterPage() {
    const {
        form,
        updateField,
        handleImageChange,
        submitForm,
    } = useRegister();

    // 모든 필드가 입력되었는지 확인
    const isFormComplete = form.nickname && form.interest && form.introduction;

    return (
        <div className="flex flex-col items-center">
            {/* 상단 헤더 */}
            <div className="flex text-center flex-col items-center text-4xl font-extrabold mt-6 mb-10 text-gray-700">
                <div>
                    Hello, {form["nickname"] ? <span className="text-themeColor ">{form["nickname"]}</span> : "______"}
                </div>
                <div>What&#39;s Your Profile?</div>
            </div>

            {/* 카드 레이아웃 */}
            <div className="flex flex-wrap justify-center gap-8 max-w-[90%]">
                {/* Nickname 입력 */}
                <Card hasLogo={false} hasMainTitle={false} className="flex-1 min-w-[400px] max-w-[450px] h-auto gap-4">
                    <h3 className="text-xl font-medium mb-4">Enter your nickname</h3>
                    <form className="flex flex-col gap-4">
                        <Input
                            type="text"
                            placeholder="Enter your nickname"
                            className="w-full"
                            value={form["nickname"]}
                            onChange={(e) => updateField("nickname", e.target.value)}
                        />
                    </form>

                    {/* 프로필 사진 업로드 */}
                    <h3 className="text-xl font-medium mb-4 mt-10">Upload profile photo</h3>
                    <div className="flex items-center gap-4">
                        {/* 기본 이미지 */}
                        {form.profileImage ? (
                            <Image
                                src={form.profileImage}
                                alt="Profile"
                                width={64}
                                height={64}
                                className="object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm text-center text-gray-500">
                                    No <br/> Image
                                </span>
                            </div>
                        )}

                        {/* 업로드 텍스트 */}
                        <div>
                            <p
                                className="text-blue-500 cursor-pointer mb-1"
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                Select a file
                            </p>
                            <p className="text-sm text-gray-500">Maximum size: 2MB</p>
                        </div>
                    </div>

                    {/* 숨겨진 파일 입력 */}
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Card>

                {/* 관심사 선택 */}
                <Card hasLogo={false} hasMainTitle={false} className="flex-1 min-w-[400px] max-w-[450px] h-auto gap-4">
                    <h3 className="text-xl font-medium mb-4">Select your interest</h3>
                    <form className="flex flex-col gap-4">
                        <Select
                            options={[
                                { value: "frontEnd", label: "FrontEnd" },
                                { value: "backEnd", label: "BackEnd" },
                                { value: "ai", label: "AI" },
                                { value: "devOps", label: "DevOps" },
                                { value: "ui/ux", label: "UI/UX" }
                            ]}
                            onChange={(e) => updateField("interest", e.target.value)}
                        />
                    </form>

                    {/* 자기소개 입력 */}
                    <h3 className="text-xl font-medium mb-4 mt-10">Write Your Introduction</h3>
                    <form className="flex flex-col gap-4">
                        <Input
                            multiline={true}
                            rows={3} // textarea 높이 증가
                            inputSize="xl"
                            type="text"
                            placeholder="Introduce yourself"
                            className="w-full"
                            onChange={(e) => updateField("introduction", e.target.value)}
                        />
                    </form>
                </Card>
            </div>

            {/* 버튼 */}
            <Button
                type="submit"
                className="w-40 mt-10"
                size="lg"
                variant={isFormComplete ? "primary" : "secondary"}
                onClick={() => submitForm()}
            >
                Complete
            </Button>
        </div>
    );
}

export default withAuth(RegisterPage, { requireRegistration: true })
// export default RegisterPage;