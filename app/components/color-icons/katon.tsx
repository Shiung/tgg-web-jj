import type { SVGProps } from 'react'
const SvgKaton = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={11} fill="#FFF200" />
    <circle cx={12.001} cy={12} r={8.556} fill="#FFD500" />
    <path
      fill="#000"
      d="M16.824 15.46v-2.467c0-.604-.64-1.185-1.397-1.47.706-.286 1.26-.801 1.26-1.373V7.556H15.06v-.445h-.898v3.068c-.01.36-.307.59-.555.59h-.504V7.11h-.897v.445H7.47c-.318 0-.48.36-.252.567L8.73 9.528v4.945l-1.513 1.404c-.226.211-.065.567.253.567h4.735v.445h.897v-4.397h.636c.247 0 .413.239.423.59v3.807h.898v-.445h1.83a6.6 6.6 0 0 1-.065-.988z"
    />
  </svg>
)
export default SvgKaton
