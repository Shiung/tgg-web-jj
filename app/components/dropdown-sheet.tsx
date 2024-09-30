import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import { cn } from '~/lib/utils'

interface DropdownBottomSheetContextType {
  innerSelectedOption: { value: string; label: string | ReactNode } | undefined
  setInnerSelectedOption: (option: { value: string; label: string | ReactNode }) => void
}

const DropdownBottomSheetContext = createContext<DropdownBottomSheetContextType | null>(null)

interface DropdownBottomSheetProps {
  id?: string
  title: string
  value: string
  placeholder?: string
  onConfirm?: (value: string) => void
  children: ReactNode
}

const DropdownSheet = ({
  id,
  title,
  value,
  placeholder,
  onConfirm,
  children,
}: DropdownBottomSheetProps) => {
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    { value: string; label: string | ReactNode } | undefined
  >()
  const [innerSelectedOption, setInnerSelectedOption] = useState<
    { value: string; label: string | ReactNode } | undefined
  >()

  useEffect(() => {
    if (value && children) {
      // Find the label corresponding to the initial value
      let foundLabel: string | ReactNode | undefined
      Children.forEach(children, child => {
        if (isValidElement(child) && child.props.value === value) {
          foundLabel = child.props.label
        }
      })
      setSelectedOption({ value, label: foundLabel || value })
    } else {
      setSelectedOption(undefined)
    }
  }, [value, children])

  useEffect(() => {
    if (open) {
      setInnerSelectedOption(selectedOption)
    }
  }, [open, selectedOption])

  const handleConfirm = () => {
    setSelectedOption(innerSelectedOption)
    if (onConfirm) {
      onConfirm(innerSelectedOption?.value || '')
    }
    setOpen(false)
  }

  return (
    <DropdownBottomSheetContext.Provider value={{ innerSelectedOption, setInnerSelectedOption }}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button id={id} variant="select" className="flex items-center justify-between space-x-2">
            <span>{selectedOption?.label || placeholder}</span>
            <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="space-y-2 p-4">{children}</div>
          <SheetFooter className="px-4 pb-4">
            <Button variant="default" onClick={handleConfirm} className="flex-1">
              Confirm
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DropdownBottomSheetContext.Provider>
  )
}
DropdownSheet.displayName = 'DropdownSheet'

interface DropdownOptionProps {
  value: string
  label: string | ReactNode
  suffix?: ReactNode
  className?: string
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ value, label, suffix, className }) => {
  const context = useContext(DropdownBottomSheetContext)

  if (!context) {
    throw new Error('DropdownOption must be used within DropdownSheet')
  }

  const { innerSelectedOption, setInnerSelectedOption } = context

  return (
    <Button
      variant="menu"
      isSelected={innerSelectedOption?.value === value}
      onClick={() => setInnerSelectedOption({ value, label })}
      className={cn('flex w-full items-center justify-between space-x-2', className)}
    >
      {typeof label === 'string' ? <span>{label}</span> : label}
      {suffix && <span>{suffix}</span>}
    </Button>
  )
}
DropdownOption.displayName = 'DropdownOption'

export { DropdownSheet, DropdownOption }
