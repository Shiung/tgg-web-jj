import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Kokon' }, { name: 'description', content: 'Welcome to Kokon!' }]
}

export default function Index() {
  return (
    <div className="container px-0 pb-safe pt-3">
      {/* carousel */}
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-black pb-2 pt-4">
        <span className="text-2xl">Carousel</span>
      </div>

      {/* Game entrance */}
      <div className="flex flex-col bg-black px-4">
        <div className="flex w-full gap-2 bg-black">
          <div className="flex-1 rounded-xl bg-gray-600">01 Casual game </div>
          <div className="flex-1 rounded-xl bg-gray-600">02 Casino game</div>
        </div>
        {/* 343 / 344 */}
        <div className="my-6 flex aspect-[343/344] w-full flex-row space-x-2">
          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex-1 rounded-xl bg-[#FF8C8C]"></div>
            <div className="flex-1 rounded-xl bg-[#5ACDFF]"></div>
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex-1 rounded-xl bg-[#FDCB04]"></div>
            <div className="h-9 rounded-xl bg-primary">More game</div>
          </div>
        </div>
      </div>
      {/* 內部測試頁面 */}
      <a
        className="fixed bottom-24 left-0 z-50 rounded-r-2xl border border-transparent bg-white/75 p-2 shadow backdrop-blur-md backdrop-saturate-150 transition-colors"
        href="/playground"
        rel="noopener noreferrer"
      >
        <h2 className="text-2xl font-semibold text-red-400">playground</h2>
      </a>
    </div>
  )
}
