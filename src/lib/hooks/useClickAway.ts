import { useEffect, useRef } from 'react';

type Handler = () => void;

export function useClickAway<T extends HTMLElement = HTMLElement>(
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
) {
    const ref = useRef<T>(null);
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleClick = (e: MouseEvent) => {
            if (!element.contains(e.target as Node)) {
                savedHandler.current();
            }
        };

        document.addEventListener(mouseEvent, handleClick);

        return () => {
            document.removeEventListener(mouseEvent, handleClick);
        };
    }, [mouseEvent]);

    return ref;
}