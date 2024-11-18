import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
    title: 'Components/Layout',
    component: Layout,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
    args: {
        children: <div>Main content goes here</div>,
    },
};
