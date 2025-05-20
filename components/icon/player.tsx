import React, { SVGProps } from 'react'

const Player: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      preserveAspectRatio="none"
      {...props}
      style={{ 
        ...props.style, width: '1em', height: '1em', color: 'currentColor' }}>
      <g clipPath="url(#clip0_2719_20355)">
        <path
          fill="currentColor"
          d="M17.12 11.106a5.364 5.364 0 1 1 0 10.728 5.364 5.364 0 0 1 0-10.728M6.404 12.778c1.77.089 2.856.312 4.116.312.41 0 .777-.024 1.144-.058a5.8 5.8 0 0 0-1.263 3.622 5.84 5.84 0 0 0 2.705 4.926c-2.438.176-5.404.102-7.4-.222-2.678-.435-4.599-2.368-4.117-5.031.41-2.26 2.393-3.67 4.815-3.549m10.716-.047a3.739 3.739 0 1 0 0 7.478 3.739 3.739 0 0 0 0-7.478m.352.976c.42 0 .767.32.808.73l.005.083v1.455h1.436a.813.813 0 0 1 .084 1.621l-.084.005h-1.437l.001 1.47a.813.813 0 0 1-1.622.084l-.004-.083V17.6h-1.49a.813.813 0 0 1-.083-1.621l.083-.005h1.49V14.52c0-.45.364-.813.813-.813M10.401 2.165c2.633 0 4.768 2.119 4.768 4.733 0 2.615-2.135 4.734-4.768 4.734s-4.77-2.12-4.77-4.734 2.136-4.733 4.77-4.733"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_2719_20355">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
};

export default Player;
