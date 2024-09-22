import { SVGProps } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import InfoIcon from '~/icons/info.svg?react'

const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={10} fill="none" {...props}>
    <path
      fill="#000"
      stroke="#FFF200"
      d="M19 9.5h1.207l-.853-.854-6.586-6.585a2.5 2.5 0 0 0-3.536 0L2.646 8.646l-.853.854H19Z"
    />
    <path fill="#000" d="M0 9h22v1H0z" />
  </svg>
)

interface InfoTooltipProps {
  content: string
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => (
  <PopoverPrimitive.Root>
    <PopoverPrimitive.Trigger asChild>
      <Button variant="icon" size="icon" className="h-4 w-4">
        <InfoIcon className="h-[14px] w-[14px]" />
      </Button>
    </PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={4}
        className={cn(
          'primary-gradient-border-rounded z-50 w-auto max-w-xs rounded-lg bg-black p-3 text-sm text-white shadow-md'
        )}
      >
        {content}
        <PopoverPrimitive.Arrow asChild width={22} height={10} className="-translate-y-[2px]">
          <Arrow className="rotate-180" />
        </PopoverPrimitive.Arrow>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
)

export default InfoTooltip
