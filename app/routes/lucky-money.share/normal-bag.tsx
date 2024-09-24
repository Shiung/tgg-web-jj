import { useState } from 'react'

import AddIcon from '~/icons/add.svg?react'
import MinusIcon from '~/icons/minus.svg?react'
import { KokonIcon } from '~/components/color-icons'
import { Button } from '~/components/ui/button'

const NormalBag = () => {
  const [amountEachBag, setAmountEachBag] = useState(10)
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="mt-3 rounded-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00] p-2">
      <div className="rounded-lg bg-[#1C1C1C] p-3">
        <div className="mb-1 px-3 pb-1 text-xs text-[#FFFFFFB2]">Amount of each bag</div>
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

        <div className="mt-3 flex space-x-2">
          {[10, 100, 500, 1000].map(el => (
            <Button
              onClick={() => setAmountEachBag(el)}
              variant="outlineSoft"
              key={el}
              className="flex-1"
            >
              {el}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="rounded-lg bg-[#1C1C1C] p-3">
          <div className="mb-1 px-3 pb-1 text-xs text-[#FFFFFFB2]">Quantity</div>
          <div className="flex items-center space-x-2">
            <div className="flex flex-1 items-center justify-between rounded-[100px] bg-[#333333] px-3 py-[10px] text-xs">
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full bg-transparent font-bold outline-none"
                style={{ maxWidth: 'calc(100% - 50px)' }}
              />
              <span className="text-[#FFFFFF80]">KOKON</span>
            </div>
            <div className="flex h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded-[100px] bg-[#333333]">
              <AddIcon
                onClick={() => setQuantity(Number(quantity) + 1)}
                className="h-6 w-6 cursor-pointer text-[#FFFFFF80] active:text-[#FFFFFF]"
              />
            </div>
            <div className="flex h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded-[100px] bg-[#333333]">
              <MinusIcon
                onClick={() => setQuantity(Number(quantity) - 1)}
                className="h-6 w-6 cursor-pointer text-[#FFFFFF80] active:text-[#FFFFFF]"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center p-3 text-xs text-[#FFFFFF80]">
          <div className="flex flex-1 flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <KokonIcon className="h-5 w-5" />
              <div className="text-sm font-ultra text-[#FFFFFF]">{amountEachBag}</div>
            </div>
            <div className="">Each bag</div>
          </div>
          <div>X</div>
          <div className="flex flex-1 flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <div className="text-sm font-ultra text-[#FFFFFF]">{quantity}</div>
            </div>
            <div className="">Quantity</div>
          </div>
          <div>=</div>
          <div className="flex flex-1 flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <div className="text-sm font-ultra text-[#FFFFFF]">{amountEachBag * quantity}</div>
            </div>
            <div className="">Total Amount</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NormalBag
