import type { SVGProps } from 'react'
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <circle cx={12} cy={12} r={11} fill="#fff" />
    <path
      fill="#000"
      d="m13.303 10.922 5.1-5.928h-1.209l-4.428 5.147L9.23 4.994H5.15l5.349 7.783-5.349 6.217H6.36l4.676-5.436 3.735 5.436h4.08zM6.794 5.904h1.857l8.544 12.221h-1.856z"
    />
  </svg>
)
export default SvgX
