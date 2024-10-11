import Board from './rank/components/board'
import PlayerCard from './rank/components/player-card'
import { Crypto } from '~/consts/crypto'

export default function Share() {
  return (
    <div className="flex flex-1 flex-col">
      <Board theme="share" />
      <div className="relative -mt-4 flex-1 rounded-t-xl bg-black">
        <div className="space-y-3 p-4">
          <PlayerCard.Title />
          {Array.from({ length: 10 }, (_, idx) => {
            return <PlayerCard key={idx} type="share" rank={idx + 4} currency={Crypto.KOKON} />
          })}
          <PlayerCard type="share" rank={99} currency={Crypto.KOKON} isSelf />
        </div>
      </div>
    </div>
  )
}
