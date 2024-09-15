import { useState } from 'react'

import { Button } from '~/components/ui/button'

const LuckBag = () => {
  const [amountEachBag, setAmountEachBag] = useState(10)
  const [minimum, setMinimum] = useState(0)
  const [maximum, setMaximum] = useState(0)

  return (
    <div className="mt-3 rounded-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00] p-2">
      <div className="rounded-lg bg-[#1C1C1C] p-3">
        <div className="mb-1 px-3 pb-1 text-xs text-[#FFFFFFB2]">Amount of total bag</div>
        <div className="flex items-center justify-between rounded-[100px] bg-[#333333] px-3 py-[10px] text-xs">
          <input
            type="number"
            value={amountEachBag}
            onChange={e => setAmountEachBag(Number(e.target.value))}
            className="w-full bg-transparent font-bold outline-none"
            style={{ maxWidth: 'calc(100% - 50px)' }}
          />
          <span className="text-[#FFFFFF80]">KOKON</span>
        </div>

        <div className="mt-3 flex gap-2">
          {[10, 100, 500, 1000].map(el => (
            <Button
              variant="outlineSoft"
              onClick={() => setAmountEachBag(el)}
              key={el}
              className="flex-1"
            >
              {el}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex flex-col gap-2 rounded-lg bg-[#1C1C1C] p-3">
          <div className="mb-1 px-3 pb-1 text-xs text-[#FFFFFFB2]">Amount range of each bag</div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex w-full justify-between px-3 text-xs text-[#FFFFFFB2]">
              <div>Minimum</div>
              <div>(no under 100)</div>
            </div>
            <div className="flex w-full items-center justify-between rounded-[100px] bg-[#333333] px-3 py-[10px] text-xs">
              <input
                type="number"
                value={minimum}
                onChange={e => setMinimum(Number(e.target.value))}
                className="w-full bg-transparent font-bold outline-none"
                style={{ maxWidth: 'calc(100% - 50px)' }}
              />
              <span className="text-[#FFFFFF80]">KOKON</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex w-full justify-between px-3 text-xs text-[#FFFFFFB2]">
              <div>Maximum</div>
              <div>(no over 1M)</div>
            </div>
            <div className="flex w-full items-center justify-between rounded-[100px] bg-[#333333] px-3 py-[10px] text-xs">
              <input
                type="number"
                value={maximum}
                onChange={e => setMaximum(Number(e.target.value))}
                className="w-full bg-transparent font-bold outline-none"
                style={{ maxWidth: 'calc(100% - 50px)' }}
              />
              <span className="text-[#FFFFFF80]">KOKON</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 rounded-lg bg-[#1C1C1C] p-2 text-xs font-semibold text-[#FFFFFFB2]">
        Potential referrals: 5~10 people
      </div>
    </div>
  )
}

export default LuckBag
