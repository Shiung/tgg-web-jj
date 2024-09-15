import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import kokonIcon from '~/components/color-icons/kokon'
import UsdtIcon from '~/components/color-icons/usdt'
import Amount from '~/components/amount'
// import TonIcon from '~/components/color-icons/ton'
import { cn } from '~/lib/utils'

const treasures = [
  {
    id: 1,
    conditions: ['1% bet amount in Crypto games'], // 寶箱的任務條件
    icon: '/images/header/treasure-cat.png', // 寶箱圖示
    totalAmount: 10082000, // 寶箱中的總金額
    unlockAmount: 10082000, // 等待解鎖的金額
    readyToClaimAmount: 10082000, // 可以領取的金額
    coinIcon: kokonIcon, // 幣種圖示
  },
  {
    id: 2,
    conditions: [
      '1% bet amount in Crypto games',
      '1% bet amount in Crypto games from level 1 friends',
    ],
    icon: '/images/header/treasure.png',
    totalAmount: 1000,
    unlockAmount: 1000,
    readyToClaimAmount: 0,
    coinIcon: UsdtIcon,
  },
]

const TreasureSheet: React.FC<{ className: string }> = ({ className }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src="/images/header/treasure.png"
          alt="Treasure"
          className={cn('h-8 w-8 object-cover', className)}
        />
      </PopoverTrigger>
      <PopoverContent className="primary-gradient-border-rounded h-auto w-screen max-w-md p-4">
        <div className="space-y-2">
          {treasures.map(treasure => (
            <div key={treasure.id} className="flex flex-col rounded-xl bg-[#1c1c1c]">
              <ul className="list-disc rounded-t-xl bg-[#333] py-2 pl-6 pr-3 text-white">
                {treasure.conditions.map((condition, index) => (
                  <li key={index} className="text-xs font-ultra">
                    {condition}
                  </li>
                ))}
              </ul>
              <div className="flex items-stretch rounded-b-xl">
                <div className="flex flex-1 items-center space-x-2 py-1 pl-3 pr-2">
                  <div className="relative">
                    <img src={treasure.icon} alt="" className="h-20 w-20" />
                  </div>
                  <div className="flex-1 text-center">
                    <Amount
                      useKMBT
                      className="text-xl font-ultra text-primary"
                      value={treasure.unlockAmount}
                    />
                    <p className="text-xs text-white/70">Waiting for unlock</p>
                  </div>
                </div>
                <div className="flex flex-[0_0_33%] flex-col items-center justify-center border-l border-dashed border-white/20 px-2 py-1">
                  <Amount
                    useKMBT
                    className="text-base font-ultra text-[#3AE45A]"
                    value={treasure.readyToClaimAmount}
                  />
                  <p className="text-xs text-white/70">Ready for claim</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* action */}
        <div className="mt-6 flex flex-row space-x-2">
          <Button className="flex-1" variant="gray" catEars>
            Check all treasure
          </Button>
          <Button className="flex-1" catEars>
            Claim
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TreasureSheet
