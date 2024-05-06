import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const [width, setWidth] = useState(1200);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(document.body);
        return () => observer.unobserve(document.body);
    }, []);

    return {
        mobile:    0 <= width && width < 800,
        small:   800 <= width && width < 1280,
        medium: 1280 <= width && width < 1366,
        large:  1366 <= width
    };
};

