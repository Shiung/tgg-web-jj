import type { SVGProps } from 'react'

const SvgEnterByFloating = (props: SVGProps<SVGSVGElement> & { imgurl: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <g filter="url(#red-entry_svg__a)">
      <mask id="red-entry_svg__c" fill="#fff">
        <path d="M0 0h26c14.36 0 26 11.64 26 26S40.36 52 26 52H0z" />
      </mask>
      <path fill="#000" fillOpacity={0.5} d="M0 0h26c14.36 0 26 11.64 26 26S40.36 52 26 52H0z" />
      <path
        fill="url(#red-entry_svg__b)"
        d="M0-1h26c14.912 0 27 12.088 27 27h-2C51 12.193 39.807 1 26 1H0zm53 27c0 14.912-12.088 27-27 27H0v-2h26c13.807 0 25-11.193 25-25zM0 52V0zM26-1c14.912 0 27 12.088 27 27S40.912 53 26 53v-2c13.807 0 25-11.193 25-25S39.807 1 26 1z"
        mask="url(#red-entry_svg__c)"
      />
      <image
        href={props.imgurl}
        x={8.95}
        y={11.6}
        width={25.65}
        height={29.25}
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
    <defs>
      <linearGradient
        id="red-entry_svg__b"
        x1={26}
        x2={26}
        y1={0}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB800" />
        <stop offset={1} stopColor="#FF4D00" />
      </linearGradient>
      <filter
        id="red-entry_svg__a"
        width={76}
        height={76}
        x={-12}
        y={-12}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={6} />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_8_4696" />
        <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_8_4696" result="shape" />
      </filter>
    </defs>
  </svg>
)

export default SvgEnterByFloating
