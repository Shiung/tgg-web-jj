import type { SVGProps } from 'react'
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path
      fill="#FF4D48"
      fillRule="evenodd"
      d="M15.388 4.224a2.09 2.09 0 1 0-2.955-2.955L8 5.702 3.567 1.27A2.09 2.09 0 1 0 .612 4.224l4.433 4.433L.612 13.09a2.09 2.09 0 1 0 2.955 2.955L8 11.612l4.432 4.433a2.09 2.09 0 0 0 2.955-2.955l-4.432-4.433z"
      clipRule="evenodd"
      opacity={0.3}
    />
  </svg>
)
export default SvgX
