import { useEffect, useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import Amount from '~/components/amount'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import { DropdownSheet, DropdownOption } from '~/components/dropdown-sheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useToast } from '~/hooks/use-toast'
import InfoTooltip from '~/components/info-tooltip'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'
import SvgHistory from '~/icons/history.svg?react'
import WarningIcon from '~/icons/warning.svg?react'

interface FormValues {
  email: string
  level: string
  date: Date
  dateRange: { from: Date; to: Date }
  dateTime: Date
  dateTimeRange: { from: Date; to: Date }
}

export default function Ui() {
  const { toast } = useToast()
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      level: '',
      date: new Date(),
      dateRange: { from: new Date(), to: new Date() },
      dateTime: new Date(),
      dateTimeRange: { from: new Date(), to: new Date() },
    },
  })
  const formValues = watch()

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('form submit', data)
  }

  useEffect(() => {
    console.log('form values', formValues)
  }, [formValues])

  return (
    <div className="container p-4 pb-safe">
      {/* Button */}
      <h1 className="flex items-center space-x-2 text-xl font-bold">
        Button
        <Switch
          id="button-loading"
          checked={loading}
          onCheckedChange={checked => setLoading(checked)}
        />
        <Label htmlFor="button-loading">Loading</Label>
        <Switch
          id="button-disabled"
          checked={disabled}
          onCheckedChange={checked => setDisabled(checked)}
        />
        <Label htmlFor="button-disabled">Disabled</Label>
      </h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button disabled={disabled} loading={loading} catEars>
          Default Button
        </Button>
        <Button disabled={disabled} loading={loading} catEars variant="gray">
          Gray Button
        </Button>
        <Button disabled={disabled} loading={loading} catEars variant="danger">
          Danger Button
        </Button>
        <Button disabled={disabled} loading={loading} variant="outline">
          Outline Button
        </Button>
        <Button disabled={disabled} loading={loading} variant="outlineSoft">
          OutlineSoft Button
        </Button>
        <Button disabled={disabled} loading={loading} variant="icon" size="icon">
          <SvgHistory className="h-4 w-4" />
        </Button>
      </div>
      {/* Input */}
      <h1 className="mt-4 text-xl font-bold">Input</h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Input placeholder="Please enter" />
        <Input disabled placeholder="Please enter" />
        {/* id 給 label 與 input 連動使用 */}
        <Input id="label" label="label" placeholder="Please enter" suffix="USDT" clearable />
        <Input
          id="password"
          label="password"
          type="password"
          placeholder="Please enter"
          clearable
        />
        <Input
          id="field"
          label="field"
          placeholder="Please enter"
          error="error message"
          hint="hint message"
          clearable
        />
      </div>

      {/* Tooltip / Toast */}
      <h1 className="mt-4 text-xl font-bold">Info Tooltip / Toast</h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="ml-2"
          onClick={() =>
            toast({
              title: 'info',
              variant: 'success',
            })
          }
        >
          Show Success Toast
        </Button>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() =>
            toast({
              title: 'info',
              variant: 'error',
            })
          }
        >
          Show success Toast
        </Button>
        {/* 漸層邊框 Tooltip */}
        <InfoTooltip content="這是點擊後顯示的 Tooltip 內容" />
      </div>

      {/* 表單 */}
      <h1 className="mt-4 text-xl font-bold">Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
        {/* email - Input */}
        <Input
          id="email"
          label="Email"
          placeholder="Please enter"
          clearable
          error={errors.email?.message}
          {...register('email')}
        />
        {/* level - Dropdown */}
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <Label htmlFor="level-dropdown" className="mb-2">
                Level Dropdown
              </Label>
              <DropdownSheet
                id="level-dropdown"
                title="LV"
                value={field.value}
                onConfirm={(selectedValue: string) => field.onChange(selectedValue)}
              >
                <DropdownOption
                  value="lv1"
                  label="LV1"
                  suffix={<WarningIcon className="h-4 w-4" />}
                />
                <DropdownOption
                  value="lv2"
                  label="LV2"
                  suffix={<WarningIcon className="h-4 w-4" />}
                />
                <DropdownOption value="lv3" label="LV3" />
                <DropdownOption value="lv4" label="LV4" />
                <DropdownOption value="all" label="LV: ALL" />
              </DropdownSheet>
            </div>
          )}
        />
        {/* date - 单个日期选择 */}
        <div className="mb-4 flex flex-col">
          <Label htmlFor="date-picker" className="mb-2">
            Select Date
          </Label>
          <Controller
            name="date" // name 與 form 的 key 對應
            control={control}
            render={({ field }) => (
              <DatePickerSheet
                id="date-picker" // 确保 id 与 Label 的 htmlFor 匹配
                title="Select Date"
                value={field.value} // 从控制器绑定的值
                onChange={field.onChange} // 确认时更新控制器的值
              />
            )}
          />
        </div>
        {/* dateRange - 日期范围选择 */}
        <div className="mb-4 flex flex-col">
          <Label htmlFor="date-range-picker" className="mb-2">
            Select Date Range
          </Label>
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <DatePickerSheet
                id="date-range-picker"
                title="Select Date"
                value={field.value}
                onChange={field.onChange}
                range
              />
            )}
          />
        </div>
        {/* dateTime - 日期和时间选择 */}
        <div className="mb-4 flex flex-col">
          <Label htmlFor="datetime-picker" className="mb-2">
            Select Datetime
          </Label>
          <Controller
            name="dateTime"
            control={control}
            render={({ field }) => (
              <DatePickerSheet
                id="datetime-picker"
                title="Select Date"
                value={field.value}
                onChange={field.onChange}
                showTimePicker
              />
            )}
          />
        </div>
        {/* dateTimeRange - 日期范围和时间选择 */}
        <div className="mb-4 flex flex-col">
          <Label htmlFor="datetime-range-picker" className="mb-2">
            Select Datetime Range
          </Label>
          <Controller
            name="dateTimeRange"
            control={control}
            render={({ field }) => (
              <DatePickerSheet
                id="datetime-range-picker"
                title="Select Date"
                value={field.value}
                onChange={field.onChange}
                range
                showTimePicker
              />
            )}
          />
        </div>
      </form>

      {/* Amount */}
      <h1 className="mt-4 text-xl font-bold">Amount</h1>
      <div className="flex flex-col space-y-1">
        <h3>使用 KMBT 格式</h3>
        <p>
          {`1500000 ->`} <Amount value={1500000} useKMBT />
        </p>

        <h3>不使用 KMBT，使用千分位</h3>
        <p>
          {`1234567 ->`} <Amount value={1234567} useKMBT={false} thousandSeparator />
        </p>

        <h3>去除小数点后的 0</h3>
        <p>
          {`1500.50 ->`} <Amount value={1500.5} useKMBT={false} removeTrailingZeros />
        </p>

        <h3>显示十亿为 B</h3>
        <p>
          {`1000000000 ->`} <Amount value={1000000000} useKMBT precision={1} />
        </p>

        <h3>显示万亿为 T</h3>
        <p>
          {`1000000000000 ->`} <Amount value={1000000000000} useKMBT precision={1} />
        </p>

        <h3>使用千分位和 KMBT 格式</h3>
        <p>
          {`2500000 ->`} <Amount value={2500000} useKMBT precision={2} thousandSeparator />
        </p>

        <h3>负数显示</h3>
        <p>
          {`-1234567 ->`} <Amount value={-1234567} useKMBT={false} thousandSeparator />
        </p>

        <h3>去除尾随的 0</h3>
        <p>
          {`1500.500 ->`}{' '}
          <Amount value={1500.5} useKMBT={false} removeTrailingZeros precision={3} />
        </p>

        <h3>保留小数位</h3>
        <p>
          {`98765.123 ->`}{' '}
          <Amount value={98765.123} useKMBT={false} precision={3} removeTrailingZeros={false} />
        </p>

        <h3>极小数值的处理</h3>
        <p>
          {`0.0001 ->`} <Amount value={0.0001} useKMBT={false} precision={5} />
        </p>
      </div>
    </div>
  )
}
