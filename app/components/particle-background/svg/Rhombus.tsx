import type { SVGProps } from 'react'
const SvgRhombus = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path stroke="#2D9BE6" strokeWidth={4} d="M2 2h12v12H2z" opacity={0.3} />
  </svg>
)
export default SvgRhombus
