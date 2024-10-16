import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LogIn } from 'lucide-react'
import useStore from '~/stores/useStore'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { prepareLoginRequest, useLogin } from '~/hooks/api/useAuth'
import InfoIcon from '~/icons/info.svg?react'
import { TelegramOAuthUser } from '../telegram-login-button/types'

type DevLoginForm = {
  id: number | undefined
  firstName: string | undefined
  referralCode?: string
}

const DevLoginDialog: React.FC = () => {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<DevLoginForm>({ mode: 'onChange' })
  const { mutate: doLogin } = useLogin()
  const isLoggedIn = useStore(state => state.isLoggedIn)

  const onSubmit: SubmitHandler<DevLoginForm> = async data => {
    if (data.id === undefined) return
    try {
      const loginData = prepareLoginRequest({ first_name: '' } as TelegramOAuthUser)
      if (!loginData) throw new Error('Failed to prepare login data')
      loginData.id = data.id
      loginData.firstName = data.firstName || ''
      data.referralCode && (loginData.referralCode = data.referralCode)
      console.log('Logging in with data:', loginData)

      await doLogin(loginData)
      setOpen(false)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" className="w-9 p-1" disabled={isLoggedIn}>
          <LogIn size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dev Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-3 pb-0 pt-3">
          <Input
            id="id"
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            label="ID (Telegram ID)"
            placeholder="Enter your ID"
            clearable
            onClear={() => setValue('id', undefined, { shouldValidate: true })}
            error={errors?.id?.message}
            {...register('id', {
              required: 'ID is required',
              valueAsNumber: true,
            })}
          />
          <Input
            id="firstName"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            clearable
            onClear={() => setValue('firstName', '', { shouldValidate: true })}
            error={errors?.firstName?.message}
            {...register('firstName', { required: 'first name is required' })}
          />
          <Input
            id="referralCode"
            type="text"
            label="Referral Code"
            placeholder="Enter referral code (optional)"
            clearable
            onClear={() => setValue('referralCode', '', { shouldValidate: true })}
            error={errors?.referralCode?.message}
            {...register('referralCode')}
          />
          <div className="flex space-x-2 rounded-lg bg-[#333] p-2 text-xs text-white/70">
            <InfoIcon className="h-4 w-4 flex-shrink-0" />
            <p className="">此為測試用途，開發環境登入</p>
          </div>
          <DialogFooter className="mt-8 flex flex-row space-x-2 px-3 pb-4">
            <DialogClose asChild>
              <Button className="flex-1" variant="gray" catEars type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1" type="submit" loading={isSubmitting} disabled={!isValid}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DevLoginDialog
