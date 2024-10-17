import { useCallback, useEffect, useMemo } from 'react'
import { Link, useSearchParams, useNavigate } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useCopyToClipboard } from 'react-use'
import { formatDate } from 'date-fns'

import useStore from '~/stores/useStore'
import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import X from '~/icons/x.svg?react'
import LoadingIcon from '~/icons/loading.svg?react'
import SvgCopy from '~/icons/copy.svg?react'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { KokonIcon } from '~/components/color-icons'
import Amount from '~/components/amount'
import { PacketResponse, PacketsResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api'
import { useShare } from '~/hooks/useShare'
import { successToast } from '~/lib/toast'
import { parseAmount } from '~/lib/amount'
import { Crypto } from '~/consts/crypto'

import { DetailSkeleton } from './skeleton'
import TerminateSharingDialog from './terminate-sharing-dialog'
import NoData from './no-data'
import InfiniteScroll from '~/components/ui/infinite-scroll'

type Kind = NonNullable<PacketsResponse['list']>[number]['distributeKind']

/**
 * state 狀態 1:進行中 2:已終止(用戶提前中斷發放) 3:已完成(發放完畢)
 * 0 or undefined 為可能預期外的狀態
 */
const STATE = {
  progressing: '1',
  terminated: '2',
  completed: '3',
}

const LuckyMoneyDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') || ''
  const kind: Kind = (searchParams.get('kind') || '') as Kind
  const state = searchParams.get('state') || ''

  const [copyState, copyToClipboard] = useCopyToClipboard()

  const {
    data: detailInfiniteDataRaw,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<PacketResponse>({
    queryKey: ['packetDetail', id],
    queryFn: ({ pageParam = 1 }) =>
      apis.packet
        .packetDetail({ packetId: id, page: pageParam as number, pageSize: 20 })
        .then(res => ({
          ...res.data,
          receiver: res.data.receiver || [],
          pagination: {
            pageSize: res.data.pagination?.pageSize ?? 0,
            totalPage: res.data.pagination?.totalPage ?? 0,
            totalRecord: res.data.pagination?.totalRecord ?? 0,
          },
        })),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.pagination?.totalPage || 0 > allPages.length) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  const detailData = useMemo(() => {
    const dataFields = detailInfiniteDataRaw?.pages?.[0]
    return {
      ...dataFields,
      // 将每一页的 receiver[] 进行合并
      receiver: detailInfiniteDataRaw?.pages?.flatMap(page => page.receiver) ?? [],
    }
  }, [detailInfiniteDataRaw])

  const { share, tDotMeBaseShareUrl } = useShare()
  const shareUrlLink = useMemo(() => {
    if (!detailData.referralCode) return ''
    return `${tDotMeBaseShareUrl}/?startapp=${detailData.referralCode}`
  }, [detailData.referralCode, tDotMeBaseShareUrl])

  const handleShareURL = useCallback(() => {
    share(shareUrlLink, 'I am sending limited lucky bags. Click here to get one!')
  }, [share, shareUrlLink])

  const handleTerminateSuccess = useCallback(() => {
    navigate('/lucky-money/list')
  }, [navigate])

  const motionProps = useMemo(() => {
    // 定义初始颜色（黑色）
    const initialColors = {
      startColor: '#000000',
      endColor: '#000000',
    }

    const targetColors = initialColors
    if (detailData.distributeKind === 'FIXED') {
      targetColors.startColor = '#FDCB04'
      targetColors.endColor = '#FF4D00'
    } else if (detailData.distributeKind === 'RANDOM') {
      targetColors.startColor = '#FF90C2'
      targetColors.endColor = '#EB0070'
    }

    // const targetColors =
    //   detailData.distributeKind === 'FIXED'
    //     ? {
    //         startColor: '#FDCB04',
    //         endColor: '#FF4D00',
    //       }
    //     : {
    //         startColor: '#FF90C2',
    //         endColor: '#EB0070',
    //       }

    // 动画变体
    const variants = {
      hidden: {
        opacity: 0,
        filter: 'blur(10px)',
        '--start-color': initialColors.startColor,
        '--end-color': initialColors.endColor,
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        '--start-color': targetColors.startColor,
        '--end-color': targetColors.endColor,
        transition: {
          duration: 1,
          ease: 'easeInOut',
          filter: { duration: 0.6 },
          opacity: { duration: 0.6 },
        },
      },
    }

    return {
      variants,
    }
  }, [detailData.distributeKind])

  useEffect(() => {
    if (!copyState.value) return
    successToast('Copied')
  }, [copyState])

  const setNavVisibility = useStore(state => state.setNavVisibility)
  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container m-0 flex flex-1 flex-col bg-black p-0 text-white">
      {/* Top Info */}
      <motion.div
        className="rounded-t-lg bg-gradient-to-b p-4 pb-8"
        style={{
          backgroundImage: 'linear-gradient(to bottom, var(--start-color), var(--end-color))',
          willChange: 'opacity, filter, --start-color, --end-color',
        }}
        initial="hidden"
        animate="visible"
        variants={motionProps.variants}
      >
        {/* Title */}
        <div className="flex items-center justify-between">
          <Button variant="icon" size="icon" onClick={() => navigate(-1)}>
            <ArrowLineLeftIcon className="h-6 w-6 text-white" />
          </Button>
          <h1 className="text-lg font-ultra">{kind === 'FIXED' ? 'Normal' : 'Luck Battle'}</h1>
          <Button variant="icon" size="icon">
            <Link to="/">
              <X className="h-6 w-6 text-white" />
            </Link>
          </Button>
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          <div className="flex justify-between text-xs font-normal">
            <span>
              {detailData.createdAt ? formatDate(detailData.createdAt, 'yyyy-MM-dd') : ''}
            </span>
            {state === STATE.terminated && (
              <div className="rounded-full bg-[#333333] px-2 py-1 text-[10px] font-ultra text-app-red">
                Terminated
              </div>
            )}
            {state === STATE.completed && (
              <div className="rounded-full bg-[#333333] px-2 py-1 text-[10px] font-ultra text-app-green">
                Completed
              </div>
            )}
          </div>
          <div className="flex items-center justify-between font-ultra">
            <p className="text-base">Total amount</p>
            <div className="flex items-center justify-center space-x-1 text-lg text-primary">
              <KokonIcon className="h-4 w-4" />
              <Amount
                crypto={Crypto.KOKON}
                value={
                  parseAmount(detailData.distributedAmount) +
                  parseAmount(detailData.remainingAmount)
                }
                useKM
              />
            </div>
          </div>
          <div className="flex justify-between font-ultra">
            <p className="text-base">Remaining</p>
            <div className="flex items-center justify-center space-x-1 text-lg text-primary">
              <KokonIcon className="h-4 w-4" />
              <Amount crypto={Crypto.KOKON} value={detailData.remainingAmount} useKM />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/30 pt-4">
          <div className="flex items-center justify-center">
            <p className="text-xs font-normal text-white/70">Each bag amount</p>
            <div className="ml-2 flex items-center justify-center space-x-1">
              <KokonIcon className="h-4 w-4" />
              <Amount
                className="font-bold"
                crypto={Crypto.KOKON}
                value={detailData.eachBagAmount}
              />
            </div>
          </div>
          <div className="flex items-center justify-center text-xs font-normal">
            <div className="text-white/30">Quantity</div>
            <span className="ml-2 flex items-center justify-center space-x-1">
              <span className="font-ultra">{detailData.distributedQuantity}</span>
              <span>/</span>
              <span>
                {parseAmount(detailData.distributedQuantity) +
                  parseAmount(detailData.remainingQuantity)}
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <>
          {/* 分享連結和按鈕 */}
          <div className="z-10 -mt-4 flex items-center justify-between rounded-2xl bg-black p-4 shadow-lg">
            <div className="relative flex h-9 max-w-[calc(100%_-_128px)] flex-1 items-center justify-between rounded-full bg-[#333] px-3 py-2 text-sm font-ultra">
              <span className="flex-1 truncate">{shareUrlLink}</span>
              <Button
                variant="icon"
                size="icon"
                type="button"
                className="h-6 w-6 text-white"
                onClick={() => copyToClipboard(shareUrlLink)}
              >
                <SvgCopy className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-[120px] flex-shrink-0" catEars onClick={handleShareURL}>
              Share
            </Button>
          </div>

          {/* 用户列表 */}
          <div className="mt-4 flex flex-1 flex-col space-y-3 overflow-y-auto px-4">
            {detailData.receiver?.length ? (
              <>
                {detailData.receiver.map((receiverItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-[#1C1C1C] px-3 py-1"
                  >
                    <div className="flex items-center justify-center">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={receiverItem?.avatar || ''} />
                        <AvatarFallback delayMs={600} />
                      </Avatar>
                      <span className="ml-2 text-xs font-normal">{receiverItem?.name}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <KokonIcon className="h-4 w-4" />
                      <Amount
                        crypto={Crypto.KOKON}
                        value={receiverItem?.amount}
                        className="text-sm font-ultra"
                      />
                    </div>
                  </div>
                ))}
                <InfiniteScroll
                  hasMore={!!hasNextPage}
                  isLoading={!!isFetchingNextPage}
                  next={fetchNextPage}
                >
                  {hasNextPage && (
                    <div>
                      <LoadingIcon className="m-auto h-6 w-6 animate-spin" />
                    </div>
                  )}
                </InfiniteScroll>
              </>
            ) : (
              <NoData />
            )}
          </div>

          {/* 終止按钮 */}
          {state === STATE.progressing && (
            <TerminateSharingDialog
              id={id}
              remaining={detailData.remainingAmount}
              onTerminateSuccess={handleTerminateSuccess}
            />
          )}
        </>
      )}
    </div>
  )
}

export default LuckyMoneyDetail
