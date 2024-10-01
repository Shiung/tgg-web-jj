/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import i18next from 'i18next'
// import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import Fetch from 'i18next-fetch-backend'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next/client'
import { defaultNS, fallbackLng, supportedLngs } from './consts/i18n'

async function main() {
  // eslint-disable-next-line import/no-named-as-default-member
  i18next
    // load translation using http -> see /public/locales (i.e. https://xxxx/public/locales)
    // Tell i18next to use the Fetch backend
    .use(Fetch)
    // detect user language (client-side language detector)
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(I18nextBrowserLanguageDetector)
    // Tell i18next to use the react-i18next plugin
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng,
      defaultNS,
      supportedLngs,
      debug: process.env.NODE_ENV === 'development',
      ns: getInitialNamespaces(),
      detection: {
        order: ['localStorage', 'htmlTag'],
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        // We will configure the backend to fetch the translations from the
        // resource route /api/locales and pass the lng and ns as search params
        loadPath: '/locales/{{lng}}.json',
      },
    })

  console.info(
    '%cAPP VERSION: %s',
    'background: #FFF200; color: #000; font-size: 16px; font-weight: bold; padding: 8px;',
    import.meta.env.VITE_APP_VERSION
  )

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>
    )
  })
}

main().catch(error => console.error(error))
