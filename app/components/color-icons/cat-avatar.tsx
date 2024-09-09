import type { SVGProps } from 'react'
const SvgCatAvatar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#FFF200"
      fillRule="evenodd"
      d="M7.7 2.707a1 1 0 0 1 1.413 0L10.406 4h3.219l1.293-1.293a1 1 0 0 1 1.414 0l3.17 3.17A9 9 0 0 1 14 22h-4A9 9 0 0 1 4.627 5.779z"
      clipRule="evenodd"
    />
    <path
      fill="#F54798"
      d="M12.73 13.8h-1.22a.36.36 0 0 0-.29.573l.61.831a.36.36 0 0 0 .58 0l.61-.831a.36.36 0 0 0-.29-.573"
    />
    <circle cx={9.18} cy={12.54} r={0.78} fill="#000" />
    <circle cx={15.012} cy={12.54} r={0.78} fill="#000" />
  </svg>
)
export default SvgCatAvatar
