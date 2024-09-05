import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Kokon' }, { name: 'description', content: 'Welcome to Kokon!' }]
}

export default function Index() {
  return (
    <div className="container px-0 pb-safe pt-3">
      {/* banner or carousel */}
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-black pb-2 pt-4">
        <span className="text-2xl">Carousel</span>
      </div>

      {/* Game entrance */}
      <div className="grid flex-grow grid-cols-2 grid-rows-[repeat(9,_minmax(40px,_1fr))] gap-4 rounded-b-xl bg-black px-4 pb-4">
        <div className="rounded-xl bg-gray-600">01 Casual game </div>
        <div className="rounded-xl bg-gray-600">02 Casino game</div>
        <div className="row-span-4 rounded-xl bg-[#FF9B76]">03 Game </div>
        <div className="row-span-6 rounded-xl bg-[#BA81FC]">04 Egg </div>
        <div className="row-span-4 rounded-xl bg-[#FF7FB8]">05 Game </div>
        <div className="row-span-2 rounded-xl bg-[#5ACDFF]">06 More</div>

        {/* 內部測試頁面 */}
        <a
          href="/playground"
          className="fixed bottom-24 left-0 z-50 rounded-r-2xl border border-transparent bg-white/75 p-2 shadow backdrop-blur-md backdrop-saturate-150 transition-colors"
          rel="noopener noreferrer"
        >
          <h2 className="text-2xl font-semibold text-red-400">playground</h2>
        </a>
      </div>
    </div>
  )
}
