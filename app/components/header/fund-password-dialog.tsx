/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { Input } from '~/components/ui/input'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import { useState, useRef, useMemo, useCallback } from 'react'
import useStore from '~/stores/useStore'
import { successToast, errorToast } from '~/lib/toast'
import VerifyButton, { ValidCode, type VerifyButtonExpose } from '~/components/verify-button'

import { useFundActions } from './hooks'
import { triggerTinyScrollAdjustment } from './utils'

interface FundPasswordDialog {
  infoRefetch: () => void
}

const ToastI18nConf = {
  add: 'FundPasswordAdded',
  update: 'FundPasswordUpdate',
  error: 'CodeIsIncorrect',
} as const

const ErrorMessageI18n = {
  least6: 'InputLeast6Error',
  invaildPsw: 'InputIvalidPasswordError',
  verificationRequire: 'InputVerificationIsRequireError',
  confirmNoMatch: 'InputPasswordConfirmNoMatchError',
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, ErrorMessageI18n.least6)
      .regex(/^[\w!@#$%^&*()-_+=]+$/, ErrorMessageI18n.invaildPsw),
    confirmPassword: z.string(),
    verificationCode: z.string().min(1, ErrorMessageI18n.verificationRequire),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: ErrorMessageI18n.confirmNoMatch,
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof formSchema>

const FundPasswordDialog: React.FC<FundPasswordDialog> = ({ infoRefetch }) => {
  const { t } = useTranslation()
  const {
    userInfo: { pin: storePin, email: storeEmail },
  } = useStore(state => state)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), mode: 'onChange' })
  const [open, setOpen] = useState(false)
  const { addBindPinHandler } = useFundActions(infoRefetch)

  const vbRef = useRef<VerifyButtonExpose>(null)
  const watchPassword = watch('password')
  const watchConfirmPassword = watch('confirmPassword')

  const isChangePin = useMemo(() => !!storePin, [storePin])
  const isPassForVerifyEmail = useMemo(() => {
    return !!watchPassword && !!watchConfirmPassword && !errors.password && !errors.confirmPassword
  }, [watchPassword, watchConfirmPassword, errors.password, errors.confirmPassword])

  function resetDialog() {
    reset() // 重置表單
    vbRef.current?.resetTimer() // 重置倒計時
  }

  const onSubmit = (values: FormValues) => {
    // console.log(values)
    addBindPinHandler(
      values.password,
      values.verificationCode,
      () => {
        setOpen(false)
        resetDialog()

        successToast(t(!isChangePin ? ToastI18nConf.add : ToastI18nConf.update))
      },
      () => {
        errorToast(t(ToastI18nConf.error))
      }
    )
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      resetDialog()
    }
    setOpen(isOpen)
  }

  const dialogHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!storeEmail) {
        return errorToast(t('EmailSetFirst'))
      }
      setOpen(true)
    },
    [storeEmail, t]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex flex-1 items-center justify-end space-x-2" onClick={dialogHandler}>
          {storePin && <div className="font-ultra text-white">{storePin}</div>}
          <Button variant="icon" size="icon" className="h-4 w-4 flex-shrink-0 text-white">
            {isChangePin ? (
              <EditIcon className="h-full w-full" />
            ) : (
              <AddIcon className="h-full w-full" />
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="absolute">
        <DialogHeader>
          <DialogTitle>{t(isChangePin ? 'ChangePassword' : 'SetPassword')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 px-3 pb-6 pt-4 text-sm text-white/70">
            {/* Fund Password */}
            <Input
              id="password"
              label={t('FundPassword')}
              type="password"
              placeholder={t('PlaceholderEnter')}
              error={errors.password?.message && t(errors.password?.message)}
              {...register('password')}
              onBlur={() => {
                triggerTinyScrollAdjustment()
              }}
            />

            <Input
              id="confirm-password"
              label={t('ConfirmPassword')}
              type="password"
              placeholder={t('PlaceholderEnter')}
              error={errors.confirmPassword?.message && t(errors.confirmPassword?.message)}
              {...register('confirmPassword')}
              onBlur={() => {
                triggerTinyScrollAdjustment()
              }}
            />
            {/* Verification Button */}
            <VerifyButton
              className="my-2"
              disabled={!isPassForVerifyEmail}
              kind={useMemo(() => {
                return isChangePin ? ValidCode.updateFundPinBind : ValidCode.firstFundPinBind
              }, [isChangePin])}
            />
            {/* Verification Code */}
            <Input
              id="verificationCode"
              label={t('VerificationCode')}
              placeholder={t('PlaceholderEnter')}
              error={errors.verificationCode?.message && t(errors.verificationCode?.message)}
              {...register('verificationCode')}
              onBlur={() => {
                triggerTinyScrollAdjustment()
              }}
            />
          </div>
          <DialogFooter className="flex flex-row space-x-2 px-3 pb-4">
            <DialogClose asChild>
              <Button className="flex-1" variant="gray" catEars>
                {t('Cancel')}
              </Button>
            </DialogClose>
            <Button className="flex-1" catEars disabled={!isValid} loading={isSubmitting}>
              {t('Ok')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FundPasswordDialog
