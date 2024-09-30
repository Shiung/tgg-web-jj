import React, { useState, useEffect, useImperativeHandle } from 'react'
import { formatCountdown } from '~/lib/utils'

export type Ref = {
  handler: (n?: number) => void
}

type props = {
  timeEnd: () => void
  timeStart: () => void
}

const CountDown = React.forwardRef<Ref, props>(({ timeStart, timeEnd }, ref) => {
  const [countdown, setCountdown] = useState<number>(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)
      typeof timeStart === 'function' && timeStart()
    } else {
      typeof timeEnd === 'function' && timeEnd()
    }
    return () => clearTimeout(timer)
  }, [countdown, timeStart, timeEnd])

  useImperativeHandle(ref, () => ({
    handler: (n?: number) => setCountdown(n === undefined ? 60 : n),
  }))

  return (
    <>
      {countdown > 0 && (
        <span className="absolute inset-y-1 right-1 flex items-center rounded-full bg-app-red px-2 text-white">
          {formatCountdown(countdown)}
        </span>
      )}
    </>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
