export const languages = [
  { icon: '/images/header/language/en.svg', value: 'en', name: 'English' },
  { icon: '/images/header/language/fr.svg', value: 'fr', name: 'Français' },
  { icon: '/images/header/language/es.svg', value: 'es', name: 'Español' },
  { icon: '/images/header/language/ar.svg', value: 'ar', name: 'عربي' },
  { icon: '/images/header/language/ja.svg', value: 'ja', name: '日本語' },
  { icon: '/images/header/language/ko.svg', value: 'ko', name: '한국어' },
]

export enum EmailBindStep {
  addEmail = 0,
  validOldEmail = 1,
  updateNewEmail = 2,
}

export * from '~/components/verify-button/constants'
