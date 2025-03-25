import React, { SVGProps } from 'react'

const Minimize: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      {...props}
      style={{ 
        ...props.style, width: '1em', height: '1em', color: 'currentColor' }}>
      <path
        stroke="currentColor"
        d="M1.5 6.5A3.5 3.5 0 0 1 5 3h10a3.5 3.5 0 0 1 3.5 3.5v7A3.5 3.5 0 0 1 15 17H5a3.5 3.5 0 0 1-3.5-3.5z"
      ></path>
      <rect width="5" height="11" x="3" y="4.5" fill="currentColor" rx="2"></rect>
    </svg>
  )
}

export default Minimize
