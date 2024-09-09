import type { SVGProps } from 'react'
const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g filter="url(#wallet_svg__a)">
      <path
        fill="url(#wallet_svg__b)"
        fillRule="evenodd"
        d="M8.3 3.067a1 1 0 0 0-1.6 0L4.616 5.845A4 4 0 0 0 1.44 9.76v8.8a4 4 0 0 0 4 4h13.12a4 4 0 0 0 4-4v-8.8a4 4 0 0 0-3.177-3.915L17.3 3.067a1 1 0 0 0-1.6 0L13.68 5.76h-3.36zm7.54 11.093a2.52 2.52 0 0 1 2.52-2.52h4.2v5.04h-4.2a2.52 2.52 0 0 1-2.52-2.52m3.478 0a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="wallet_svg__c"
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
        fill="#FFF200"
        fillRule="evenodd"
        d="M8.3 3.067a1 1 0 0 0-1.6 0L4.616 5.845A4 4 0 0 0 1.44 9.76v8.8a4 4 0 0 0 4 4h13.12a4 4 0 0 0 4-4v-8.8a4 4 0 0 0-3.177-3.915L17.3 3.067a1 1 0 0 0-1.6 0L13.68 5.76h-3.36zm7.54 11.093a2.52 2.52 0 0 1 2.52-2.52h4.2v5.04h-4.2a2.52 2.52 0 0 1-2.52-2.52m3.478 0a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#wallet_svg__c)">
      <circle cx={36.398} cy={2.818} r={28.338} fill="url(#wallet_svg__d)" />
    </g>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M18.36 11.64a2.52 2.52 0 0 0 0 5.04h4.2v-5.04zm-.002 3.48a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="wallet_svg__b"
        x1={17.501}
        x2={6.923}
        y1={3.925}
        y2={22.055}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB800" />
        <stop offset={0.45} stopColor="#FFF200" />
        <stop offset={1} stopColor="#FFB800" />
      </linearGradient>
      <linearGradient
        id="wallet_svg__d"
        x1={22.22}
        x2={13.694}
        y1={15.797}
        y2={7.521}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFED01" stopOpacity={0} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <filter
        id="wallet_svg__a"
        width={21.12}
        height={19.894}
        x={1.441}
        y={2.667}
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
        <feBlend in2="shape" result="effect1_innerShadow_98_195250" />
      </filter>
    </defs>
  </svg>
)
export default SvgWallet
