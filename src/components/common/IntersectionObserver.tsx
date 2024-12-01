'use client';

import { useEffect, useRef } from 'react';
import {InfiniteScrollTriggerProps} from "@/types/components/commonProps";

export function InfiniteScrollTrigger({ onIntersectAction, enabled = true }: InfiniteScrollTriggerProps) {
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersectAction();
                }
            },
            {
                threshold: 1.0,
                rootMargin: '100px',
            }
        );

        const trigger = triggerRef.current;
        if (trigger) {
            observer.observe(trigger);
        }

        return () => {
            if (trigger) {
                observer.unobserve(trigger);
            }
        };
    }, [onIntersectAction, enabled]);

    return <div ref={triggerRef} className="h-4 w-full" />;
}