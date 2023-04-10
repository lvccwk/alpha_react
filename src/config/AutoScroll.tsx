import { useEffect, useRef } from 'react';

const AutoScroll: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, []);

    return <div ref={scrollRef}>{ }</div>;
};

export default AutoScroll;