import { MouseEvent } from 'react'
import { Link, LinkProps, PrefetchPageLinks } from '@remix-run/react'
import useStore from '~/stores/useStore'

interface ProtectedLinkProps extends LinkProps {
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export default function ProtectedLink({
  to,
  className,
  children,
  onClick,
  ...rest
}: ProtectedLinkProps) {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault() // 阻止默认跳转行为
    if (!isLoggedIn)
      openNeedLoginDialog() // 打开登录对话框
    else if (onClick) onClick(e) // 如果有 onClick 回调，则执行
  }

  return (
    <>
      {/* 預載路由資源 */}
      {isLoggedIn && <PrefetchPageLinks page={to as string} />}
      {/* 如果已登录且没有 onClick 回调，则直接使用 to 跳转 */}
      {isLoggedIn && to && !onClick ? (
        <Link to={to} className={className} {...rest}>
          {children}
        </Link>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className={className} onClick={handleClick}>
          {children}
        </a>
      )}
    </>
  )
}
