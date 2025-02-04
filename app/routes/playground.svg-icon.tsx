import { useEffect } from 'react'
import { useCopyToClipboard } from 'react-use'
import { Button } from '~/components/ui/button'
import { successToast } from '~/lib/toast'

// ~/components/color-icons 複雜多色 Icon
import * as ColorIcons from '~/components/color-icons'
// ~/icons 單色 Icon
import Icons from '~/icons/index'

export default function SvgIcon() {
  const [state, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    if (!state.value) return
    successToast('Copied')
  }, [state])

  return (
    <div className="container px-2 py-4">
      <h1 className="text-xl font-bold">svg-icon</h1>
      <h2 className="mt-4 text-lg font-bold">複雜多色 Icon</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {Object.entries(ColorIcons).map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-start">
            <Icon className="h-6 w-6" />
            <p className="break-word mt-2 text-start">{name}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-4 text-lg font-bold">單色 Icon</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {Object.entries(Icons).map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-start">
            {name === 'LoadingIcon' ? (
              <Icon className="h-6 w-6 animate-spin" />
            ) : (
              <Icon className="h-6 w-6" />
            )}
            <div className="mt-2 flex items-center justify-center text-primary">
              <Button
                variant="icon"
                size="icon"
                className="h-4 w-4"
                onClick={() => copyToClipboard(`import { ${name} } from '~/icons/index'` || '')}
              >
                <Icons.CopyIcon className="h-full w-full" />
              </Button>
              <span className="ml-1 break-words">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
