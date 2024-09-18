import { useEffect } from 'react'
import { useLocation, useNavigate } from '@remix-run/react'
import { useBackButton } from '@telegram-apps/sdk-react'
import { links } from '~/components/main-nav'

const noBackButtonRoutes = links.map(link => link.href) as string[]

export default function useTelegramNavigate() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const bb = useBackButton()

  useEffect(() => {
    const handleBackButtonClick = () => {
      navigate(-1)
    }
    if (noBackButtonRoutes.includes(pathname)) {
      bb.hide()
    } else {
      bb.show()
      bb.on('click', handleBackButtonClick)
    }

    return () => {
      bb.off('click', handleBackButtonClick)
    }
  }, [pathname, bb, navigate])
}
