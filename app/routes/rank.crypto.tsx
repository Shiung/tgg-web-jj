import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useRankContext } from './rank/provider'
import { Crypto as CryptoConst } from '~/consts/crypto'

import Board from './rank/components/board'
import Skeleton from './rank/components/skeleton'
import PlayerCard from './rank/components/player-card'

export default function Crypto() {
  const [currentTab, setCurrentTab] = useState('Daily')
  const { state } = useRankContext()

  if (state.isLoading) return <Skeleton />

  return (
    <div className="flex flex-1 flex-col">
      <Board />
      <Tabs defaultValue="Daily" value={currentTab} className="-mt-4 flex w-full flex-1 flex-col">
        <TabsList variant="cardTab" className="relative w-full overflow-x-auto">
          <TabsTrigger variant="cardTab" value="Daily" className="flex-1" asChild>
            <button onClick={setCurrentTab.bind(null, 'Daily')}>Daily</button>
          </TabsTrigger>
          <TabsTrigger variant="cardTab" value="Weekly" className="flex-1" asChild>
            <button onClick={setCurrentTab.bind(null, 'Weekly')}>Weekly</button>
          </TabsTrigger>
          <TabsTrigger variant="cardTab" value="Monthly" className="flex-1" asChild>
            <button onClick={setCurrentTab.bind(null, 'Monthly')}>Monthly</button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="mt-0 flex flex-1">
          <div className="flex flex-1 flex-col space-y-3 bg-black p-4">
            <PlayerCard.Title />
            {Array.from({ length: 10 }, (_, idx) => {
              return (
                <PlayerCard key={idx} type="crypto" rank={idx + 4} currency={CryptoConst.USDT} />
              )
            })}
            <PlayerCard type="crypto" rank={99} currency={CryptoConst.KOKON} isSelf />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
