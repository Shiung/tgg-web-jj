import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
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
import XIcon from '~/icons/x.svg?react'
import { cn } from '~/lib/utils'

interface DropdownBottomSheetContextType {
  innerSelectedOption: { value: string | object; label: string | ReactNode } | undefined
  setInnerSelectedOption: (option: { value: string | object; label: string | ReactNode }) => void
}

const DropdownBottomSheetContext = createContext<DropdownBottomSheetContextType | null>(null)

interface DropdownBottomSheetProps {
  id?: string
  title: string
  value: string | object
  placeholder?: string
  customTrigger?: (props: {
    selectedLabel: string | ReactNode | undefined
    placeholder: string | undefined
    isOpen: boolean
  }) => ReactNode
  onConfirm?: (value: string | object) => void
  onReset: () => void
  children: ReactNode
}

const DropdownSheet = ({
  id,
  title,
  value,
  placeholder,
  customTrigger,
  onConfirm,
  onReset,
  children,
}: DropdownBottomSheetProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    { value: string | object; label: string | ReactNode } | undefined
  >()
  const [innerSelectedOption, setInnerSelectedOption] = useState<
    { value: string | object; label: string | ReactNode } | undefined
  >()

  useEffect(() => {
    if (value && children) {
      let foundLabel: string | ReactNode | undefined
      Children.forEach(children, child => {
        if (
          isValidElement(child) &&
          (child.props.value === value ||
            (typeof child.props.value === 'object' &&
              JSON.stringify(child.props.value) === JSON.stringify(value)))
        ) {
          foundLabel = child.props.label
        }
      })

      if (foundLabel) {
        setSelectedOption({ value, label: foundLabel || JSON.stringify(value) })
      } else {
        setSelectedOption(undefined)
      }
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

  const handleClear = () => {
    if (onReset) {
      onReset()
    }
    setOpen(false)
    setSelectedOption(undefined)
    setInnerSelectedOption(undefined)
  }

  const triggerContent = useMemo(() => {
    return customTrigger ? (
      customTrigger({
        selectedLabel: selectedOption?.label,
        placeholder,
        isOpen: open,
      })
    ) : (
      <Button id={id} variant="select" className="flex items-center justify-between space-x-2">
        <span
          className={cn(
            'overflow-hidden text-ellipsis text-xs font-ultra',
            selectedOption?.label ? 'tex-white' : 'text-white/50'
          )}
        >
          {selectedOption?.label || placeholder}
        </span>
        {selectedOption?.label ? (
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={e => {
              e.stopPropagation()
              setSelectedOption(undefined)
              setInnerSelectedOption(undefined)
              if (onReset) {
                onReset()
              }
            }}
          >
            <XIcon className="h-4 w-4 text-white" />
          </Button>
        ) : (
          <ArrowLineDownIcon className="h-4 w-4 flex-shrink-0 text-white/70" />
        )}
      </Button>
    )
  }, [customTrigger, id, onReset, open, placeholder, selectedOption?.label])

  return (
    <DropdownBottomSheetContext.Provider value={{ innerSelectedOption, setInnerSelectedOption }}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{triggerContent}</SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex max-h-[calc(100vh_-_48px-_44px-_60px)] flex-col items-stretch space-y-2 overflow-y-auto p-4">
            {children}
          </div>
          <SheetFooter className="px-4 pb-4">
            <Button variant="gray" catEars onClick={handleClear} className="flex-1">
              {t('Clear')}
            </Button>
            <Button variant="default" catEars onClick={handleConfirm} className="flex-1">
              {t('Confirm')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DropdownBottomSheetContext.Provider>
  )
}
DropdownSheet.displayName = 'DropdownSheet'

interface DropdownOptionProps {
  value: string | object
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

  const isSelected =
    typeof value === 'string'
      ? innerSelectedOption?.value === value
      : typeof innerSelectedOption?.value === 'object' &&
        JSON.stringify(innerSelectedOption.value) === JSON.stringify(value)

  return (
    <Button
      variant="menu"
      isSelected={isSelected}
      onClick={() => setInnerSelectedOption({ value, label })}
      className={cn('flex w-full flex-shrink-0 items-center justify-between space-x-2', className)}
    >
      {typeof label === 'string' ? <span>{label}</span> : label}
      {suffix && <span>{suffix}</span>}
    </Button>
  )
}
DropdownOption.displayName = 'DropdownOption'

export { DropdownSheet, DropdownOption }
