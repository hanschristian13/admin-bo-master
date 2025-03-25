import React, { SVGProps } from 'react'

const More: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M12 17.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m0-6a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m0-6a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5"
      ></path>
    </svg>
  )
};

export default More;
