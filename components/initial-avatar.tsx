import React from 'react';

interface AvatarProps {
  name: string;
}

const InitialAvatar: React.FC<AvatarProps> = ({ name }) => {
  const initials = name ? name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase() : '-';

  const charCode = initials.charCodeAt(0);
  const colorIndex = (charCode - 'A'.charCodeAt(0)) % 5;

  const backgroundColors = [
    'bg-violet-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-orange-100',
    'bg-purple-100',
  ];
  const Colors = [
    'text-violet-950',
    'text-green-950',
    'text-blue-950',
    'text-orange-950',
    'text-purple-950',
  ];

  const textColor = Colors[colorIndex];
  const backgroundColor = backgroundColors[colorIndex];

  return (
    <div className={`${backgroundColor} ${textColor} size-6 rounded-full flex items-center justify-center text-sm font-semibold capitalize`}>
      {initials}
    </div>
  );
};

export default InitialAvatar;
