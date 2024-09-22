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
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import { useEffect, useState } from 'react'
import { formatCountdown } from '~/lib/utils'

interface EmailDialogProps {
  email: string
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter email address' }),
  verificationCode: z.string().min(1, 'Verification code is required'),
})

const EmailDialog: React.FC<EmailDialogProps> = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      verificationCode: '',
    },
  })

  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const watchedEmail = watch('email')

  function handleSendCode() {
    setCountdown(60) // Start 60 seconds countdown
    console.log('Simulate sending verification code to:', watchedEmail)
  }

  function resetDialog() {
    reset() // 重置表單
    setCountdown(0) // 重置倒計時
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {email ? (
          <div className="flex items-center space-x-2 text-white">
            <span className="font-ultra">{email}</span>
            <Button variant="icon" size="icon" className="h-4 w-4">
              <EditIcon className="h-full w-full" />
            </Button>
          </div>
        ) : (
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <AddIcon className="h-full w-full" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{email ? 'Change Your Email' : 'Add Your Email'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-3 pb-6 pt-4 text-sm text-white/70">
            {/* Email */}
            <Input
              id="email"
              label="Email"
              placeholder="Please enter"
              clearable
              error={errors.email?.message}
              {...register('email')}
            />
            {/* Verification Button */}
            <Button
              className="mt-2 w-full"
              variant="outline"
              type="button"
              onClick={handleSendCode}
              disabled={!watchedEmail || !!errors.email || countdown > 0}
            >
              Send Verification Code{' '}
              {countdown > 0 && (
                <span className="absolute inset-y-1 right-1 flex items-center rounded-full bg-app-red px-2 text-white">
                  {formatCountdown(countdown)}
                </span>
              )}
            </Button>
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

export default EmailDialog
