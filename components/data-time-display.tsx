'use client'

import { useEffect, useState } from 'react';

const DateTimeDisplay: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentDate(new Date());
      const timer = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const formatDateTime = (date: Date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  if (!isMounted) {
    return <div className='container-date-time-display'></div>;
  }

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className='container-date-time-display'
    >
      {formatDateTime(currentDate)}
    </div>
  );
};

export default DateTimeDisplay;
