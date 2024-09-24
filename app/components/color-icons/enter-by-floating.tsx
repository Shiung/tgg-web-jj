import type { SVGProps } from 'react'
import React from 'react'

interface SvgEnterByFloatingProps extends SVGProps<SVGSVGElement> {
  imgurl: string
  imgWidth?: number
  imgHeight?: number
}

const SvgEnterByFloating: React.FC<SvgEnterByFloatingProps> = ({
  imgurl,
  imgWidth = 25.65,
  imgHeight = 29.25,
  ...props
}) => (
  <div className="relative h-[52px] w-[52px] rounded-r-full backdrop-blur-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={52}
      height={52}
      fill="none"
      {...props}
      className="relative z-10"
    >
      <defs>
        <mask id="mask">
          <path fill="#fff" d="M0 0h26c14.36 0 26 11.64 26 26S40.36 52 26 52H0z" />
        </mask>
      </defs>
      <g filter="url(#red-entry_svg__a)">
        <path
          fill="url(#red-entry_svg__b)"
          d="M0-1h26c14.912 0 27 12.088 27 27h-2C51 12.193 39.807 1 26 1H0zm53 27c0 14.912-12.088 27-27 27H0v-2h26c13.807 0 25-11.193 25-25zM0 52V0zM26-1c14.912 0 27 12.088 27 27S40.912 53 26 53v-2c13.807 0 25-11.193 25-25S39.807 1 26 1z"
          mask="url(#mask)"
        />
        <image
          href={imgurl}
          x={(52 - imgWidth) / 2}
          y={(52 - imgHeight) / 2}
          width={imgWidth}
          height={imgHeight}
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
  </div>
)

export default SvgEnterByFloating
