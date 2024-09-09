import type { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path stroke="#2D9BE6" strokeWidth={4} d="M2 2h12v12H2z" opacity={0.3} />
  </svg>
)
export default SvgComponent
