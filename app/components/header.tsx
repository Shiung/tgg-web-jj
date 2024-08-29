import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className='bg-black backdrop-blur sticky top-0 z-50'>
      <div className='mx-auto px-4 py-2 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-12'>
        <Link to='/'>
          <img src='/logo.svg' alt='Kokon Logo' width={90} height={24} />
        </Link>

        <div className=''>{t('hello')}</div>
      </div>
    </header>
  )
}

export default Header
