import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 19a.75.75 0 01.75-.75h14a.75.75 0 010 1.5H5a.75.75 0 01-.75-.75zm3 3a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75z"
        fill="#1C274C"
      />
      <path
        d="M6.083 15.25a6.75 6.75 0 1111.835 0H22a.75.75 0 010 1.5H2a.75.75 0 010-1.5h4.083z"
        fill="#1C274C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.399 4.399a.75.75 0 011.06 0l.393.392a.75.75 0 01-1.06 1.061l-.393-.393a.75.75 0 010-1.06zm15.202 0a.75.75 0 010 1.06l-.393.393a.75.75 0 01-1.06-1.06l.393-.393a.75.75 0 011.06 0zM1.25 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"
        fill="#1C274C"
      />
    </svg>
  )
}

export default SvgComponent
