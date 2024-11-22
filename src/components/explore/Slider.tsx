import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils/cn';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    className?: string;
}

export const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderProps
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            'relative flex w-full touch-none select-none items-center',
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-200">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-gray-900" />
        </SliderPrimitive.Track>
        {props.value?.map((_, index) => (
            <SliderPrimitive.Thumb
                key={index}
                className="block h-4 w-4 rounded-full border border-gray-200 bg-white ring-offset-white
                   transition-colors focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none
                   disabled:opacity-50 hover:bg-gray-100"
            />
        ))}
    </SliderPrimitive.Root>
));

Slider.displayName = "Slider";