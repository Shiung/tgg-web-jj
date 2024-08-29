import type { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'Kokon' },
    { name: 'description', content: 'Welcome to Kokon!' }
  ]
}

export default function Index() {
  return (
    <div className='mx-auto max-w-screen-sm pt-4 pb-safe'>
      {/* banner or carousel */}
      <div className='bg-[#FFF53B] flex items-center justify-center h-40 rounded-t-xl pb-2 pt-4 bg-card'>
        <span className='text-2xl'>轮播图区域</span>
        <Button className='bg-slate-400' />
      </div>

      {/* Game entrance */}
      <div className='flex-grow grid grid-cols-2 grid-rows-[repeat(9,_minmax(40px,_1fr))] gap-4 rounded-b-xl px-4 pb-4 bg-card'>
        <div className='bg-gray-600 rounded-xl'>01 Casual game </div>
        <div className='bg-gray-600 rounded-xl'>02 Casino game</div>
        <div className='bg-[#FF9B76] row-span-4 rounded-xl'>03 游戏一</div>
        <div className='bg-[#BA81FC] row-span-6 rounded-xl'>04 轉盤</div>
        <div className='bg-[#FF7FB8] row-span-4 rounded-xl'>05 游戏一</div>
        <div className='bg-[#5ACDFF] row-span-2 rounded-xl'>06 more</div>

        <a
          href='/test'
          className='fixed z-50 left-0 bottom-24 rounded-r-2xl border border-transparent p-2 transition-colors bg-white/75 shadow backdrop-blur-md backdrop-saturate-150'
          rel='noopener noreferrer'
        >
          <h2 className='text-red-400 text-2xl font-semibold'>Test</h2>
        </a>
      </div>
    </div>
  )
}
