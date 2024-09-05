import type { SVGProps } from 'react'
const SvgCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <circle cx={8} cy={8} r={6} stroke="#FFF200" strokeWidth={4} />
  </svg>
)
export default SvgCircle
