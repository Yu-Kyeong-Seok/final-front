import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';

type CountdownTimerProps = {
    className?: string; // className prop 추가
};

const getNextWeekendEndTime = () => {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(23, 59, 59, 999); // 일요일 밤 11:59:59

    return nextSunday.getTime();
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ className }) => {
    const [timeLeft, setTimeLeft] = useState(() => getNextWeekendEndTime() - Date.now());

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(getNextWeekendEndTime() - Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    return <div className={cn(className)}>{timeLeft > 0 ? formatTime(timeLeft) : "주말 특가 종료"}</div>;
};

export default CountdownTimer;