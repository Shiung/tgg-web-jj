import Amount from '~/components/amount'
import { Button } from '~/components/ui/button'

export default function Ui() {
  return (
    <div className="container p-4 pb-safe">
      <h1 className="text-xl font-bold">Button</h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button catEars>Default Button</Button>
        <Button catEars variant="gray">
          Button
        </Button>
        <Button catEars variant="danger">
          Button
        </Button>
        <Button variant="outline">Button</Button>
        <Button variant="outlineSoft">Button</Button>
      </div>
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
