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
        children: <div className="p-4 fixed left-36 top-24 h-full">Main content goes here</div>,
    },
};
