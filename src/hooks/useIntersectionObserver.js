import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Check for IntersectionObserver support
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver is not supported by this browser.');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            options
        );

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]); 

    return [ref, isIntersecting];
};

export default useIntersectionObserver;
