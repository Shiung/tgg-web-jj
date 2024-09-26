import { MouseEvent } from 'react'
import { Link, LinkProps } from '@remix-run/react'
import useStore from '~/stores/useStore'

interface ProtectedLinkProps extends LinkProps {
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export default function ProtectedLink({ to, className, children, ...rest }: ProtectedLinkProps) {
  const token = useStore(state => state.token)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault() // 阻止默认跳转行为
    openNeedLoginDialog() // 打开登录对话框
  }

  return token ? (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
