import type { Meta, StoryObj } from '@storybook/react';
import AuthLayout from './layout';

const meta: Meta<typeof AuthLayout> = {
    title: 'Layouts/AuthLayout',
    component: AuthLayout,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
    args: {
        children: (
            <div className="h-96 flex items-center justify-center bg-gray-100">
                <p className="text-xl">로그인/회원가입 페이지가 이곳에 렌더링됩니다</p>
            </div>
        ),
    },
};

export const WithLongContent: Story = {
    args: {
        children: (
            <div className="min-h-[1200px] flex items-center justify-center bg-gray-100">
                <p className="text-xl">긴 컨텐츠를 가진 페이지</p>
            </div>
        ),
    },
};