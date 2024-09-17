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
import { Label } from '~/components/ui/label'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import { useState } from 'react'
import { formatCountdown } from '~/lib/utils'

interface FundPasswordDialog {
  password: string
}

const formSchema = z.object({
  password: z
    .string()
    .min(6, 'At least 6 characters required')
    .regex(/^[\w!@#$%^&*()-_+=]+$/, 'Invalid password format'),
  verificationCode: z.string().min(1, 'Verification code is required'),
})

type FormValues = z.infer<typeof formSchema>

const FundPasswordDialog: React.FC<FundPasswordDialog> = ({ password }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), mode: 'onChange' })
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const watchPassword = watch('password')

  const handleSendCode = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setCountdown(60)
        }
        return prev - 1
      })
    }, 1000)
  }

  function resetDialog() {
    reset() // 重置表單
    setCountdown(0) // 重置倒計時
  }

  const onSubmit = (values: FormValues) => {
    console.log(values)
    setOpen(false)
    resetDialog()
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
        {password ? (
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
          <DialogTitle>{password ? 'Change Your Password' : 'Set Your Password'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-3 pb-6 pt-4 text-sm text-white/70">
            {/* Fund Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Fund Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Please enter"
                className={errors.password ? 'input-error' : ''}
                {...register('password')}
              />
              {errors.password && (
                <p className={`flex items-center space-x-1 pl-3 text-app-red`}>
                  <WarningIcon className="mr-1 h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Verification Button */}
            <Button
              className="mt-2 w-full"
              variant="outline"
              type="button"
              onClick={handleSendCode}
              disabled={!watchPassword || !!errors.password || countdown > 0}
            >
              Send Verification Code{' '}
              {countdown > 0 && (
                <span className="absolute inset-y-1 right-1 flex items-center rounded-full bg-app-red px-2 text-white">
                  {formatCountdown(countdown)}
                </span>
              )}
            </Button>
            {/* Verification Code */}
            <div className="mt-3 space-y-1">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Please enter"
                className={errors.verificationCode ? 'input-error' : ''}
                {...register('verificationCode')}
              />
              {errors.verificationCode && (
                <p className="flex items-center pl-3 text-app-red peer-invalid:visible">
                  <WarningIcon className="mr-1 h-3 w-3" />
                  {errors.verificationCode.message}
                </p>
              )}
            </div>
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
