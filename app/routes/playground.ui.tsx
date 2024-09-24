import { useState } from 'react'
import Amount from '~/components/amount'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useToast } from '~/hooks/use-toast'
import InfoTooltip from '~/components/info-tooltip'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'
import SvgHistory from '~/icons/history.svg?react'
// import { Label } from '~/components/ui/label'

export default function Ui() {
  const { toast } = useToast()
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

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
          Button
        </Button>
        <Button disabled={disabled} loading={loading} catEars variant="danger">
          Button
        </Button>
        <Button disabled={disabled} loading={loading} variant="outline">
          Button
        </Button>
        <Button disabled={disabled} loading={loading} variant="outlineSoft">
          Button
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
      <InfoTooltip content="這是點擊後顯示的 Tooltip 內容" />
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
