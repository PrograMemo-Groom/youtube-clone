import {useEffect, useRef} from "react";

const useIntersectionObserver = (onIntersect, options) => {
    const targetRef = useRef(null);

    useEffect(() => {
        if (!targetRef.current) return;

        const observer = new IntersectionObserver((items) => {
            // 관찰대상이 화면에 보이면 실행
            if (items[0].isIntersecting) {
                onIntersect();
            }
        }, options);

        observer.observe(targetRef.current);

        return () => {
            if(targetRef.current) observer.disconnect();
        }

    }, [onIntersect, options]);
    return targetRef;
}

export default useIntersectionObserver;