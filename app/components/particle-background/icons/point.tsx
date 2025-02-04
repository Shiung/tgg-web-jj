import type { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={8}
    fill="none"
    viewBox="0 0 8 8"
    {...props}
  >
    <circle cx={4} cy={4} r={4} fill="#FFF200" />
  </svg>
)
export default SvgComponent
