import React from 'react';
import { rgbToRgba } from '@/lib/rgb-to-rgba';
import { cn } from '@/lib/utils';

export type DotStatusColor = 'orange' | 'blue' | 'red' | 'violet' | 'purple' | 'green' | 'neutral';

interface DotStatusProps {
  style?: DotStatusColor;
  color?: string; //Only rgb color
}

const DotStatus: React.FC<DotStatusProps> = ({ style, color }) => {
  const colorClasses = {
    orange: 'bg-orange-950 shadow-orange-200',
    blue: 'bg-blue-950 shadow-blue-200',
    red: 'bg-red-950 shadow-red-200',
    violet: 'bg-violet-950 shadow-violet-200',
    purple: 'bg-purple-950 shadow-purple-200',
    green: 'bg-green-950 shadow-green-200',
    neutral: 'bg-neutral-950 shadow-neutral-200',
  };
  const rgbaColor = color ? rgbToRgba(color, 0.2) : 'rgba(0,0,0)'
  return (
    <span
      className={cn(
        'size-1.5 rounded-full ',
        style && `shadow-[0_0_0_3px_rgba(0,0,0,0.1)] ${colorClasses[style]}`
      )}
      style={{
        backgroundColor: color ? color : undefined,
        boxShadow: color ? `0 0 0 3px ${rgbaColor}` : undefined
      }}
      aria-hidden="true"
    ></span>
  );
};

export default DotStatus;