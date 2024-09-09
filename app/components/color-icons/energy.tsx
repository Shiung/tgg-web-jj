import type { SVGProps } from 'react'
const SvgEnergy = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="url(#energy_svg__a)"
      d="M19.059 2.66a2.2 2.2 0 0 0-3.112 0c-.86.86-2.485 3.878-1.625 4.737.859.86 3.877-.766 4.737-1.625a2.2 2.2 0 0 0 0-3.112M16.69 5.03a.871.871 0 1 1 1.232-1.233.871.871 0 0 1-1.232 1.233"
    />
    <path fill="#25D7D8" d="M2 7h20v14H2z" />
    <mask
      id="energy_svg__b"
      width={20}
      height={14}
      x={2}
      y={7}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill="#4BFCFF" d="M2 7h20v14H2z" />
    </mask>
    <g fill="#fff" fillOpacity={0.3} mask="url(#energy_svg__b)">
      <path d="M-6.266 7.735h3.31l8.8 12.609h-3.31zM-.308 7.735h3.31l8.8 12.609h-3.31zM5.65 7.735h3.31l8.8 12.609h-3.31zM11.61 7.735h3.31l8.798 12.609h-3.31zM17.567 7.735h3.31l8.8 12.609h-3.31z" />
    </g>
    <path
      fill="#BABABA"
      d="M23 6.986a.726.726 0 0 1-.727.728H1.727a.727.727 0 1 1 0-1.455h20.546c.401 0 .727.326.727.727M23 21.225a.726.726 0 0 1-.727.727H1.727a.727.727 0 1 1 0-1.454h20.546c.401 0 .727.326.727.727"
    />
    <path
      fill="#FFF200"
      d="m10.069 9.318-1.614 4.068c-.08.2.069.419.285.419h2.36c.195 0 .34.18.298.372l-1.012 4.574c-.071.322.345.513.543.25l4.58-6.098a.306.306 0 0 0-.245-.49h-1.11a.306.306 0 0 1-.26-.469l1.49-2.35a.306.306 0 0 0-.259-.47h-4.772a.31.31 0 0 0-.284.194"
    />
    <defs>
      <linearGradient
        id="energy_svg__a"
        x1={16.66}
        x2={15.284}
        y1={3.944}
        y2={7.255}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BABABA" />
        <stop offset={1} stopColor="#848484" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgEnergy
