import {useEffect, useRef} from "react";

const useIntersectionObserver = (onIntersect, options) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const targetElement = targetRef.current;
        if (!targetElement) return;

        const observer = new IntersectionObserver((items) => {
            // 관찰대상이 화면에 보이면 실행
            if (items[0].isIntersecting) {
                onIntersect();
            }
        }, options);

        observer.observe(targetElement);

        return () => {
            if(targetElement) observer.disconnect();
        }

    }, [onIntersect, options]);
    return targetRef;
}

export default useIntersectionObserver;