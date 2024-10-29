// LoadingLine.js
import useBoolean from '@/hooks/useBoolean.hook';
import { cn } from '@/lib/cn';
import {FC, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const LoadingLine:FC = () => {
    const { value: isLoading, setValue: setLoading } = useBoolean()
    const location = useLocation();
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer)
    }, [location])
    return (
        <div
            className={cn('fixed top-0 left-0 h-1.5 bg-my_color_secondary transition-transform duration-300 ease-in-out', {
                'transform translate-x-0': isLoading,
                'transform -translate-x-full': !isLoading,
            })}
            style={{ width: '100%' }}
        />
    );
};

export default LoadingLine;
