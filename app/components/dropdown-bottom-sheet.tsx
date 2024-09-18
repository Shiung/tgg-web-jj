import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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
  selectedValue: string | undefined
  setSelectedValue: (value: string) => void
}

const DropdownBottomSheetContext = createContext<DropdownBottomSheetContextType | null>(null)

interface DropdownBottomSheetProps {
  title: string
  value: string // 受控值
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
  children: ReactNode
}

const DropdownBottomSheet = ({
  title,
  value,
  onChange,
  onConfirm,
  children,
}: DropdownBottomSheetProps) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedValue || '')
    }
  }

  const handleOptionSelect = (selected: string) => {
    setSelectedValue(selected)
    if (onChange) {
      onChange(selected) // 触发受控模式的变化
    }
  }

  return (
    <DropdownBottomSheetContext.Provider
      value={{ selectedValue, setSelectedValue: handleOptionSelect }}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="select">
            <div className="flex items-center justify-between space-x-2">
              <span>{selectedValue || 'Select an option'}</span>
              <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
            </div>
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
DropdownBottomSheet.displayName = 'DropdownBottomSheet'

interface DropdownOptionProps {
  value: string
  label: string | ReactNode
  suffix?: ReactNode
  className?: string
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ value, label, suffix, className }) => {
  const context = useContext(DropdownBottomSheetContext)

  if (!context) {
    throw new Error('DropdownOption must be used within DropdownBottomSheet')
  }

  const { selectedValue, setSelectedValue } = context

  return (
    <Button
      variant="menu"
      isSelected={selectedValue === value}
      onClick={() => setSelectedValue(value)}
      className={cn('flex w-full items-center justify-between space-x-2', className)}
    >
      {typeof label === 'string' ? <span>{label}</span> : label}
      {suffix && <span>{suffix}</span>}
    </Button>
  )
}
DropdownOption.displayName = 'DropdownOption'

export { DropdownBottomSheet, DropdownOption }
