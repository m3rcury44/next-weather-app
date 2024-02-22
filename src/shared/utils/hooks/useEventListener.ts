import { useEffect } from "react";

export const useEventListener = <T>(eventType: string, fn: (e: T) => void, attached?: boolean) => {
    useEffect(() => {
        if (attached !== undefined && !attached) return;

        const handler = (e: Event) => {
            fn(e as T)
        }

        document.addEventListener(eventType, handler);

        return () => {
            document.removeEventListener(eventType, handler);
        };
    }, [eventType, fn, attached]);
};
