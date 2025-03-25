import React, { SVGProps } from 'react'

const Close: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 18 18 6M6 6l12 12"
      ></path>
    </svg>
  )
};

export default Close;
