import type { Meta, StoryObj } from '@storybook/react';
import LoginPage from './page';
import AuthLayout from '../layout';

const meta: Meta<typeof LoginPage> = {
    title: 'Pages/Auth/Login',
    component: LoginPage,
    decorators: [
        (Story) => (
            <AuthLayout>
                <Story />
            </AuthLayout>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};