import React, { SVGProps } from 'react'

const SlotGames: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      preserveAspectRatio="none"
      {...props}
      style={{ 
        ...props.style, width: '1em', height: '1em', color: 'currentColor' }}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.2 11.77a12.44 12.44 0 0 0-1.4 5.7v1.25H8.08a13.9 13.9 0 0 1 1.25-5.69 21.7 21.7 0 0 1 3.37-5.28h-7V4.09H18v1.94a33.5 33.5 0 0 0-3.8 5.74m6.6 4.06a7.64 7.64 0 0 0-1.5 3.26l-.15.75-4.15-.76a9.53 9.53 0 0 1 3.34-5.57l-3-.59 1.26-2.66 7.4 1.46-.23 1.16a21.4 21.4 0 0 0-2.97 2.95M6.17 18.16a7.5 7.5 0 0 1 0-3.59 20 20 0 0 1 1.45-3.96l-.28-1.15L0 11.22v2.92l3-.71a9.47 9.47 0 0 0-.72 6.48l4.07-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
};

export default SlotGames;
