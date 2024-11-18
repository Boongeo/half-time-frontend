import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "기본 입력창입니다",
    },
};

export const WithLabel: Story = {
    args: {
        label: "이메일",
        placeholder: "이메일을 입력하세요",
    },
};

export const WithError: Story = {
    args: {
        label: "비밀번호",
        type: "password",
        error: true,
        helperText: "비밀번호는 8자 이상이어야 합니다",
    },
};

export const Filled: Story = {
    args: {
        variant: "filled",
        placeholder: "filled variant input",
    },
};

export const FullRounded: Story = {
    args: {
        rounded: "xl",
        placeholder: "둥근 모서리 입력창",
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Input
                inputSize="sm"
                placeholder="Small size"
            />
            <Input
                inputSize="md"
                placeholder="Medium size"
            />
            <Input
                inputSize="lg"
                placeholder="Large size"
            />
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: "비활성화된 입력창",
    },
}

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        placeholder: "전체 너비 입력창",
    },
};

export const CompleteExample: Story = {
    args: {
        label: "사용자 이름",
        placeholder: "이름을 입력하세요",
        helperText: "실명을 사용해주세요",
        variant: "filled",
        rounded: "xl",
        inputSize: "lg",
        fullWidth: true,
    },
};