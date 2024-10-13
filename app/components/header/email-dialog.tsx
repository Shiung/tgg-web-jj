import { useState, useMemo, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import { successToast, errorToast } from '~/lib/toast'
import { useEmailActions, useEmailStatus } from './hooks'
import { ValidCode, EmailBindStep } from './constants'
import useStore from '~/stores/useStore'
import VerifyButton, { type VerifyButtonExpose } from '~/components/verify-button'

interface EmailDialogProps {
  infoRefetch: () => void
}

const ToastConf = {
  add: 'Email added',
  update: 'Email updated',
  error: 'Code is incorrect',
} as const

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter email address' }),
  verificationCode: z.string().min(1, 'Verification code is required'),
})

const EmailDialog: React.FC<EmailDialogProps> = ({ infoRefetch }) => {
  const {
    info: { email: storeEmail },
  } = useStore(state => state)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      verificationCode: '',
    },
  })

  const vbRef = useRef<VerifyButtonExpose>(null)
  const { addBindEmailHandler, verifyCodeEmailHandler } = useEmailActions(infoRefetch)
  const { isEditEmail, stepStatus, isVerifyCurrentHandler } = useEmailStatus({
    email: storeEmail ?? '',
  })

  const [open, setOpen] = useState(false)
  const watchedEmail = watch('email')

  function resetDialog() {
    reset() // 重置表單
    vbRef.current?.resetTimer() // 重置倒計時
    isVerifyCurrentHandler(false)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log('onSubmit -->', values)
    addBindEmailHandler(
      values.email,
      values.verificationCode,
      () => {
        setOpen(false)
        resetDialog()
        successToast(!isEditEmail ? ToastConf.add : ToastConf.update)
      },
      () => {
        errorToast(ToastConf.error)
      }
    )
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      resetDialog()
    }
    setOpen(isOpen)
  }

  const vaildCheckOldEmailCallBack = useCallback(() => {
    // TODO add valid origin email api
    const codeVal = getValues('verificationCode')
    verifyCodeEmailHandler(
      codeVal,
      () => {
        vbRef.current?.resetTimer()
        isVerifyCurrentHandler(true)
        reset()
      },
      () => {
        errorToast(ToastConf.error)
      }
    )
  }, [reset, isVerifyCurrentHandler, verifyCodeEmailHandler, getValues])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEditEmail ? (
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <EditIcon className="h-full w-full" />
          </Button>
        ) : (
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <AddIcon className="h-full w-full" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditEmail ? 'Edit Email' : 'Add Your Email'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-3 pb-6 pt-4 text-sm text-white/70">
            {/* Email */}
            {isEditEmail && (
              <>
                <div className="space-y-1">
                  <Label>Current Email</Label>
                  <div className="ml-3 font-ultra text-white">{storeEmail}</div>
                </div>
                <hr className="my-[24px] border-white/20" />
              </>
            )}
            {[EmailBindStep.addEmail, EmailBindStep.updateNewEmail].some(
              key => key === stepStatus
            ) && (
              <Input
                id="email"
                label={!isEditEmail ? 'Email' : 'Change Email'}
                placeholder="Please enter"
                clearable
                onClear={() => setValue('email', '', { shouldValidate: true })}
                error={errors.email?.message}
                {...register('email')}
              />
            )}
            {/* Verification Button */}
            <VerifyButton
              className="my-2"
              ref={vbRef}
              kind={useMemo(() => {
                if (stepStatus === EmailBindStep.addEmail) return ValidCode.firstEmailBind
                if (stepStatus === EmailBindStep.validOldEmail) return ValidCode.valid
                return ValidCode.updateEmailBind
              }, [stepStatus])}
              email={watchedEmail}
              disabled={
                stepStatus !== EmailBindStep.validOldEmail ? !watchedEmail || !!errors.email : false
              }
              successCallBack={useCallback(
                () =>
                  stepStatus === EmailBindStep.validOldEmail && setValue('email', storeEmail || ''),
                [storeEmail, setValue, stepStatus]
              )}
              errorCallBack={() => errorToast(ToastConf.error)}
            />
            {/* Verification Code */}
            <Input
              id="verificationCode"
              label="Verification Code"
              placeholder="Please enter"
              error={errors.verificationCode?.message}
              {...register('verificationCode')}
            />
          </div>
          <DialogFooter className="flex flex-row space-x-2 px-3 pb-4">
            <DialogClose asChild>
              <Button className="flex-1" variant="gray" catEars>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              catEars
              disabled={!isValid}
              {...(stepStatus === EmailBindStep.validOldEmail && {
                type: 'button',
                onClick: vaildCheckOldEmailCallBack,
              })}
            >
              Ok
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmailDialog
