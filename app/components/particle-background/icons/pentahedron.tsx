import type { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    viewBox="0 0 16 14"
    {...props}
  >
    <path
      stroke="#7D2FD7"
      strokeWidth={4}
      d="M2.5 6.244 8 2.434l5.5 3.81-2.495 5.612h-6.01z"
      opacity={0.3}
    />
  </svg>
)
export default SvgComponent
