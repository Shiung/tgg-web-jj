import { useEffect, useState } from 'react'
import useStore from '~/stores/useStore'
import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import TransactionRecord from './transaction-record'
import BetRecord from './bet-record'
import { cn } from '~/lib/utils'

const DEFAULT_TAB = 'transaction'

export default function History() {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  const setNavVisibility = useStore(
    (state: { setNavVisibility: (visible: boolean) => void }) => state.setNavVisibility
  )

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
  }

  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [])

  return (
    <div className="mb-2 flex flex-1 flex-col rounded-xl bg-black">
      <div className="relative mx-4 my-3">
        <ArrowLineLeftIcon
          className="absolute left-0 top-0 h-6 w-6 cursor-pointer"
          onClick={() => window.history.back()}
        />
        <div className="flex h-6 w-full justify-center text-lg font-ultra leading-6">History</div>
      </div>

      <div className="relative z-10 flex flex-1 cursor-pointer flex-col rounded-t-xl">
        <Tabs
          defaultValue={DEFAULT_TAB}
          value={currentTab}
          onValueChange={handleTabChange}
          className="flex w-full flex-1 flex-col"
        >
          <TabsList variant="cardTab" className="w-full overflow-x-auto">
            <TabsTrigger variant="cardTab" value="transaction" className="flex-1" asChild>
              {/* <Link to="deposit">Deposit</Link> */}
              <span className="text-sm font-ultra">Transaction</span>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="bet" className="flex-1" asChild>
              {/* <Link to="withdraw">Withdraw</Link> */}
              <span className="text-sm font-ultra">Bet</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="transaction"
            className={cn('mt-0 flex flex-col', currentTab === 'transaction' ? 'flex-1' : 'flex-0')}
          >
            <TransactionRecord currentTab={currentTab} />
          </TabsContent>
          <TabsContent
            value="bet"
            className={cn('mt-0 flex flex-col', currentTab === 'bet' ? 'flex-1' : 'flex-0')}
          >
            <BetRecord currentTab={currentTab} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
