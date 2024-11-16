import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className
}: ModalProps) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={cn(
                                'w-full max-w-lg rounded-lg bg-white p-6 shadow-xl',
                                className
                            )}>
                                <div className="flex items-start justify-between text-gray-600">
                                    <div className="space-y-1">
                                        {title && (
                                            <Dialog.Title className="text-lg font-medium">
                                                {title}
                                            </Dialog.Title>
                                        )}
                                        {description && (
                                            <Dialog.Description className="text-sm text-gray-500">
                                                {description}
                                            </Dialog.Description>
                                        )}
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1.5 hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}