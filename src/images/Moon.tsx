import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg
      height="18px"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="M29 28c0-11.917 7.486-22.112 18-26.147A27.841 27.841 0 0037 0C21.561 0 9 12.561 9 28s12.561 28 28 28c3.523 0 6.892-.66 10-1.853C36.486 50.112 29 39.917 29 28z"
        fill="#a5a5a4"
      />
    </svg>
  )
}

export default SvgComponent
