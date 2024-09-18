import { useEffect, useState } from 'react'
import useStore from '~/stores/useStore'
import { cn } from '~/lib/utils'

import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import X from '~/icons/x.svg?react'
import SvgCopy from '~/icons/copy.svg?react'
import { Button } from '~/components/ui/button'
import { Link, useSearchParams } from '@remix-run/react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { KokonIcon } from '~/components/color-icons'
import StopSharingDialog from './stop-sharing-dialog'

const LuckyMoneyDetail = () => {
  const [shareLink, setShareLink] = useState('http://kokon.com/test')
  const handleCopyShareLink = () => {
    const tempInput = document.createElement('input')
    tempInput.value = shareLink
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    alert('Link copied to clipboard!')
  }
  const handleShare = async () => {
    try {
      if (typeof navigator === 'undefined' || !navigator.share) {
        return
      }
      await navigator.share({
        title: 'Title',
        text: 'Share Content',
        url: 'shareLink',
      })
    } catch (err) {
      console.log('errerrerr', err)
    }
  }

  // 获取特定的 search param
  const [searchParams] = useSearchParams()
  const luckyMoneyStatus = searchParams.get('status')
  const luckyMoneyType = searchParams.get('type')

  const setNavVisibility = useStore(state => state.setNavVisibility)
  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container m-0 flex flex-col bg-black p-0 text-white">
      {/* 顶部卡片 */}
      <div
        className={cn(
          'rounded-t-lg bg-gradient-to-b p-4 pb-8',
          luckyMoneyType && +luckyMoneyType === 0
            ? 'from-[#FDCB04] to-[#FF4D00]'
            : 'from-[#FF90C2] to-[#EB0070]'
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="#"
            onClick={e => {
              e.preventDefault()
              window.history.go(-1)
            }}
          >
            <ArrowLineLeftIcon className="h-6 w-6 text-[#FFFFFFB2]" />
          </Link>
          <h1 className="text-lg font-[1000]">
            {luckyMoneyType === '0' ? 'Normal' : 'Luck Battle'}
          </h1>
          <Link to="/">
            <X className="h-6 w-6 text-[#FFFFFFB2]" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-normal">
            <div>2024-06-17</div>
            {luckyMoneyStatus && +luckyMoneyStatus === 1 && (
              <div className="rounded-[100px] bg-[#333333] px-2 py-1 text-[10px] font-[1000] text-[#3AE45A]">
                Completed
              </div>
            )}
            {luckyMoneyStatus && +luckyMoneyStatus === 0 && (
              <div className="rounded-[100px] bg-[#333333] px-2 py-1 text-[10px] font-[1000] text-[#FF4D48]">
                Terminated
              </div>
            )}
          </div>
          <div className="flex items-center justify-between font-[1000]">
            <p className="text-base">Normal</p>
            <div className="flex items-center justify-center text-lg">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-1">18.88K</div>
            </div>
          </div>
          <div className="flex justify-between font-[1000]">
            <p className="text-base">Remaining</p>
            <div className="flex items-center justify-center text-lg">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-1">9.88K</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/30 pt-4">
          <div className="flex items-center justify-center">
            <p className="text-xs font-normal text-[#FFFFFFB2]">Each bag amount</p>
            <div className="ml-2 flex items-center justify-center">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-1 font-bold">1,888</div>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs font-normal">
            <div className="text-[#FFFFFFB2]">Quantity</div>
            <div className="ml-2 flex items-center justify-center gap-1">
              <div className="font-[1000]">5</div>
              <div>/</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </div>

      {/* 分享連結和按鈕 */}
      <div className="-mt-4 flex items-center justify-between rounded-2xl bg-black p-4 shadow-lg">
        <div className="mr-2 flex flex-grow items-center rounded-full bg-gray-800 px-4 py-2">
          <input
            type="text"
            value={shareLink}
            onChange={e => setShareLink(e.target.value)}
            className="flex-grow bg-transparent text-sm outline-none"
          />
          <SvgCopy className="h-4 w-4" onClick={handleCopyShareLink} />
        </div>
        <Button catEars onClick={handleShare}>
          Share
        </Button>
      </div>

      {/* 用户列表 */}
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto px-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-[#1C1C1C] px-3 py-1"
          >
            <div className="flex items-center justify-center">
              {/* Avatar */}
              <Avatar>
                {/* test https://github.com/shadcn.png */}
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="h-9 w-9" delayMs={600} />
              </Avatar>
              <div className="ml-2 text-xs font-normal">User1234</div>
            </div>
            <div className="flex items-center justify-center">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-[5px] text-sm font-[1000]">1,888</div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部按钮 */}
      {luckyMoneyStatus && +luckyMoneyStatus === 2 && <StopSharingDialog />}
    </div>
  )
}

export default LuckyMoneyDetail
