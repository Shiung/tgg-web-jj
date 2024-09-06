import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 bg-black backdrop-blur">
      <div className="mx-auto flex h-12 w-full items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="/logo.svg" alt="Kokon Logo" width={90} height={24} />
        </Link>

        <div className="">{t('hello')}</div>
      </div>
    </header>
  )
}

export default Header
