import type { SVGProps } from 'react'
const SvgTon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={10} fill="#fff" />
    <path
      fill="#0AF"
      d="M7.1 8.4q-.15.3 0 .6l4.3 7.6V8.2H7.6c-.2 0-.4 0-.5.2M16.4 8.2h-3.8v8.4L16.9 9c.1-.2.1-.4 0-.5-.1-.3-.2-.3-.5-.3"
    />
    <path
      fill="#0AF"
      d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1m6 8.6L12.7 19c-.2.3-.4.4-.7.4s-.6-.2-.7-.4L6 9.6c-.4-.6-.4-1.3 0-1.8.3-.6.9-.9 1.6-.9h8.9c.7 0 1.3.3 1.6.9.2.3.2.6.2.9q0 .45-.3.9"
    />
  </svg>
)
export default SvgTon
