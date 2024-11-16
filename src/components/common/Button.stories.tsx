import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
    },
};

export const Small: Story = {
    args: {
        children: 'Small Button',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        children: 'Large Button',
        size: 'lg',
    },
};

export const Loading: Story = {
    args: {
        children: 'Loading Button',
        loading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        fullWidth: true,
    },
};