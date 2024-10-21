import { useImage } from 'react-image'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

interface GameImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcList: string | string[]
  alt?: string
  fallbackSrc?: string // srcList 都失敗的備用圖源
  isFetching?: boolean
  skeletonClassName?: string // 骨架屏使用 class
}

const Image: React.FC<GameImgProps> = ({
  srcList,
  alt = '',
  className,
  skeletonClassName,
  fallbackSrc,
  isFetching,
  ...props
}) => {
  const { src, isLoading, error } = useImage({
    srcList: Array.isArray(srcList) ? srcList : [srcList],
    useSuspense: false,
  })

  if (isFetching || isLoading) {
    return <Skeleton className={cn(skeletonClassName ? skeletonClassName : className)} />
  }

  return (
    <img
      className={className}
      src={error && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      {...props}
    />
  )
}

export default Image
