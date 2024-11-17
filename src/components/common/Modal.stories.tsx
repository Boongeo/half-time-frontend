import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useState } from 'react';

const meta = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
                <div>
                    <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                    <Story
                        {...context}
                        args={{
                            ...context.args,
                            isOpen,
                            onClose: () => setIsOpen(false)
                        }}
                    />
                </div>
            );
        }
    ]
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    args: {
        title: 'Example Modal',
        description: 'This is a description of the modal content.',
        children: (
            <div className="space-y-4">
                <p>This is the modal content. You can put anything here.</p>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                </div>
            </div>
        ),
    },
};

export const WithoutDescription: Story = {
    args: {
        title: 'Simple Modal',
        children: (
            <div className="space-y-4">
                <p>A modal without description.</p>
                <div className="flex justify-end">
                    <Button>Close</Button>
                </div>
            </div>
        ),
    },
};

export const LongContent: Story = {
    args: {
        title: 'Scrollable Modal',
        children: (
            <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <p key={i}>
                        This is paragraph {i + 1} with some long content to demonstrate scrolling behavior in the modal.
                    </p>
                ))}
                <div className="flex justify-end">
                    <Button>Close</Button>
                </div>
            </div>
        ),
    },
};