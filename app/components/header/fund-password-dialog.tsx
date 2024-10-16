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
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import { useState, useRef, useMemo } from 'react'
import useStore from '~/stores/useStore'
import { successToast, errorToast } from '~/lib/toast'
import VerifyButton, { ValidCode, type VerifyButtonExpose } from '~/components/verify-button'

import { useFundActions } from './hooks'

interface FundPasswordDialog {
  infoRefetch: () => void
}

const ToastConf = {
  add: 'Fund Pin added',
  update: 'Fund Pin updated',
  error: 'Code is incorrect',
} as const

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, 'At least 6 characters required')
      .regex(/^[\w!@#$%^&*()-_+=]+$/, 'Invalid password format'),
    confirmPassword: z.string(),
    verificationCode: z.string().min(1, 'Verification code is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The password confirmation does not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof formSchema>

const FundPasswordDialog: React.FC<FundPasswordDialog> = ({ infoRefetch }) => {
  const {
    userInfo: { pin: storePin },
  } = useStore(state => state)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

        successToast(!isChangePin ? ToastConf.add : ToastConf.update)
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isChangePin ? (
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
          <DialogTitle>{isChangePin ? 'Change Your Password' : 'Set Your Password'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 px-3 pb-6 pt-4 text-sm text-white/70">
            {/* Fund Password */}
            <Input
              id="password"
              label="Fund Password"
              type="password"
              placeholder="Please enter"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="Please enter"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
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
            <Button className="flex-1" catEars disabled={!isValid}>
              Ok
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FundPasswordDialog
