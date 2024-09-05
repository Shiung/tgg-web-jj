import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@remix-run/react'

export function useInitI18n() {
  const { i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    // 从 URL 中获取语言参数，例如 ?lng=ja
    const searchParams = new URLSearchParams(location.search)
    const language =
      searchParams.get('lng') || localStorage.getItem('lng') || navigator.language.split('-')[0]

    // 切换 i18next 的语言
    i18n.changeLanguage(language)

    // 存储语言设置，以便在以后使用
    localStorage.setItem('lng', language)
  }, [location.search, i18n])
}
