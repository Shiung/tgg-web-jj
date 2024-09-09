import type { SVGProps } from 'react'
const SvgGame = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g filter="url(#game_svg__a)">
      <path
        fill="url(#game_svg__b)"
        fillRule="evenodd"
        d="M9.113 2.733a1 1 0 0 0-1.414 0L4.627 5.805A9 9 0 0 0 10 22.026h4a9 9 0 0 0 5.502-16.123l-3.17-3.17a1 1 0 0 0-1.414 0l-1.293 1.293h-3.219zM8.32 9.412v1.66h1.66v1.66h-1.66v1.659H6.66v-1.66H5v-1.66h1.66V9.413zm7.086.586a.846.846 0 1 1 1.691 0 .846.846 0 0 1-1.691 0m-1.058 1.058a.846.846 0 1 1 0 1.691.846.846 0 0 1 0-1.691m1.058 2.749a.846.846 0 1 1 1.692 0 .846.846 0 0 1-1.692 0m2.75-2.75a.846.846 0 1 1 0 1.692.846.846 0 0 1 0-1.691"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="game_svg__d"
      width={22}
      height={21}
      x={1}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path
        fill="url(#game_svg__c)"
        fillRule="evenodd"
        d="M9.113 2.733a1 1 0 0 0-1.414 0L4.627 5.805A9 9 0 0 0 10 22.026h4a9 9 0 0 0 5.502-16.123l-3.17-3.17a1 1 0 0 0-1.414 0l-1.293 1.293h-3.219zM8.32 9.412v1.66h1.66v1.66h-1.66v1.659H6.66v-1.66H5v-1.66h1.66V9.413zm7.086.586a.846.846 0 1 1 1.691 0 .846.846 0 0 1-1.691 0m-1.058 1.058a.846.846 0 1 1 0 1.691.846.846 0 0 1 0-1.691m1.058 2.749a.846.846 0 1 1 1.692 0 .846.846 0 0 1-1.692 0m2.75-2.75a.846.846 0 1 1 0 1.692.846.846 0 0 1 0-1.691"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#game_svg__d)">
      <circle cx={36.392} cy={2.814} r={28.338} fill="url(#game_svg__e)" />
    </g>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M8.32 11.046v-1.66H6.66v1.66H5v1.66h1.66v1.659h1.66v-1.66h1.659v-1.66zm7.93-1.92a.846.846 0 1 0 0 1.692.846.846 0 0 0 0-1.692m-1.057 2.75a.846.846 0 1 0-1.692 0 .846.846 0 0 0 1.692 0m1.057 1.057a.846.846 0 1 0 0 1.692.846.846 0 0 0 0-1.692M19 11.875a.846.846 0 1 0-1.692 0 .846.846 0 0 0 1.692 0"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="game_svg__b"
        x1={17.729}
        x2={7.612}
        y1={3.679}
        y2={22.026}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB800" />
        <stop offset={0.45} stopColor="#FFF200" />
        <stop offset={1} stopColor="#FFB800" />
      </linearGradient>
      <linearGradient
        id="game_svg__c"
        x1={17.729}
        x2={7.612}
        y1={3.679}
        y2={22.026}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB800" />
        <stop offset={0.45} stopColor="#FFF200" />
        <stop offset={1} stopColor="#FFB800" />
      </linearGradient>
      <linearGradient
        id="game_svg__e"
        x1={22.214}
        x2={13.688}
        y1={15.793}
        y2={7.517}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFED01" stopOpacity={0} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <filter
        id="game_svg__a"
        width={22}
        height={19.586}
        x={1}
        y={2.44}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-0.5} dy={0.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.99 0" />
        <feBlend in2="shape" result="effect1_innerShadow_98_195246" />
      </filter>
    </defs>
  </svg>
)
export default SvgGame
