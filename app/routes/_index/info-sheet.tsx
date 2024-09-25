import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import info from './info'

interface InfoBottomSheetProps {
  type: 'responsibleGamblingInfo' | 'privacyPolicyInfo'
}

const InfoSheet = ({ type }: InfoBottomSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          size="link"
          className="w-[68px] whitespace-pre-wrap text-center text-xs font-normal text-white/70"
        >
          {info[type].trigger}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[calc(100vh_-_48px)]">
        <SheetHeader className="pr-12">
          <SheetTitle>{info[type].title}</SheetTitle>
        </SheetHeader>
        <SheetClose />
        <div className="mx-auto max-h-[calc(100vh_-_48px-_44px)] w-full space-y-6 overflow-y-auto p-4 text-start">
          {info[type].sections.map((section, index) => (
            <div key={index}>
              <h1 className="text-base font-ultra">{section.title}</h1>
              <div className="mt-1 text-sm font-normal text-white/70">
                {section.content.map((paragraph, idx) => (
                  <p key={idx} className="">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default InfoSheet
