import React, { SVGProps } from 'react'

const SuperAgent: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M20.925 16.393c.488 2.793-1.458 4.82-4.17 5.276-2.62.441-6.89.441-9.51 0-2.712-.455-4.658-2.482-4.17-5.275.415-2.37 2.423-3.847 4.877-3.72 1.792.093 2.893.326 4.168.326 1.29 0 2.149-.233 3.927-.326 2.453-.128 4.464 1.35 4.878 3.72M11.667 2a4.666 4.666 0 1 1 0 9.333 4.666 4.666 0 0 1 0-9.333"
      ></path>
    </svg>
  )
};

export default SuperAgent;
