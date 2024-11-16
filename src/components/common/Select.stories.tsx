import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const defaultOptions = [
    { value: '1', label: '옵션 1' },
    { value: '2', label: '옵션 2' },
    { value: '3', label: '옵션 3' },
];

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        inputSize: {
            control: 'select',
            options: ['sm', 'md'],
        },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        options: defaultOptions,
    },
};

export const WithLabel: Story = {
    args: {
        label: '라벨',
        options: defaultOptions,
    },
};

export const Small: Story = {
    args: {
        inputSize: 'sm',
        options: defaultOptions,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        options: defaultOptions,
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        options: defaultOptions,
    },
};