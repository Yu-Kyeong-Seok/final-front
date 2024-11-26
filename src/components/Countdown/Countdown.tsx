import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';

const styles = cn.bind({});

type CountdownTimerProps = {
    className?: string;
};

const getNextWeekendEndTime = () => {
    const now = new Date();
    const nextSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 - now.getDay()) % 7) + 1, 0, 0, 0, 0);
    return nextSunday.getTime();
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ className }) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const nextWeekendEndTime = getNextWeekendEndTime();
        const initialTimeLeft = nextWeekendEndTime - Date.now();
        setTimeLeft(initialTimeLeft);

        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft === null || prevTimeLeft <= 0) return null;
                return prevTimeLeft - 1000;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (timeLeft === null) return null;

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles(className)}>
            {timeLeft > 0 ? formatTime(timeLeft) : "주말 특가 종료"}
        </div>
    );
};

export default CountdownTimer;