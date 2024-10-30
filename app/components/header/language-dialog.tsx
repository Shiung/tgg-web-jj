import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import SettingIcon from '~/icons/setting.svg?react'
import { useState, useCallback, useMemo } from 'react'
import { languages } from './constants'

const LanguageDialog: React.FC = () => {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const currentLanguage = useMemo(
    () => languages.find(language => language.value === selectedLanguage),
    [selectedLanguage]
  )

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
  }

  const handleConfirm = () => {
    i18n.changeLanguage(selectedLanguage)
    setOpen(false)
  }

  const onOpenChangeHandler = useCallback(
    (o: boolean) => {
      if (!o && i18n.language !== selectedLanguage) setSelectedLanguage(i18n.language)
      setOpen(o)
    },
    [i18n.language, selectedLanguage]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2">
          {currentLanguage && (
            <img
              src={currentLanguage.icon}
              alt={`${currentLanguage.name} icon`}
              className="h-6 w-6"
            />
          )}
          <span className="font-ultra text-white">{currentLanguage?.name}</span>
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <SettingIcon className="h-full w-full" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Language')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 px-3 pb-6 pt-4 text-sm text-white">
          {languages.map(language => (
            <Button
              key={language.value}
              variant="menu"
              className="h-10 justify-start space-x-2 border-transparent bg-[#1C1C1C]"
              isSelected={selectedLanguage === language.value}
              onClick={() => handleLanguageSelect(language.value)}
            >
              <img src={language.icon} alt={`${language.name} icon`} className="h-6 w-6" />
              <span>{language.name}</span>
            </Button>
          ))}
        </div>
        <DialogFooter className="flex flex-row space-x-2 px-3 pb-4">
          <DialogClose asChild>
            <Button className="flex-1" variant="gray" catEars>
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button className="flex-1" onClick={handleConfirm} catEars>
            {t('Ok')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LanguageDialog
