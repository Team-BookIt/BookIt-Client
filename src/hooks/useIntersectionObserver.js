import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            options
        );

        if (ref.current) 
            observer.observe(ref.current);

        return () => {
            if (ref.current)
                observer.unobserve(ref.current);
        };
    }, [options]);

    return [ref, isIntersecting];
};

export default useIntersectionObserver;