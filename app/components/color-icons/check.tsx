import type { SVGProps } from 'react'
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <g fillRule="evenodd" clipPath="url(#check_svg__a)" clipRule="evenodd">
      <path
        fill="#3AE45A"
        d="M12.004 1.006c6.074 0 11 4.926 11 11s-4.926 11-11 11-11-4.926-11-11 4.926-11 11-11"
      />
      <path
        fill="#fff"
        d="m9.72 15.58-2.693-2.696a1.18 1.18 0 0 1 0-1.667 1.183 1.183 0 0 1 1.666 0l1.899 1.9 4.723-4.723a1.18 1.18 0 0 1 1.667 0 1.18 1.18 0 0 1 0 1.667l-5.558 5.557a1.18 1.18 0 0 1-1.704-.039"
      />
    </g>
    <defs>
      <clipPath id="check_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCheck
