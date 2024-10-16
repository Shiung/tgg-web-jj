import { type SettingResponse } from '~/api/codegen/data-contracts'
import useStore from '~/stores/useStore'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '~/components/ui/sheet'
import SvgEnterByFloating from '~/components/color-icons/enter-by-floating'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import Amount from '~/components/amount'

interface TableData {
  headers: string[]
  rows: {
    label?: string
    values: (string | React.ReactElement)[]
  }[]
}
interface TableDemoProps {
  tableData: TableData | null
  isAlternateHorizontal?: boolean
}
const TableDemo: React.FC<TableDemoProps> = ({ tableData, isAlternateHorizontal = true }) => {
  if (!tableData) return null
  return (
    <div className="overflow-x-auto rounded-xl">
      <Table className="relative border-collapse rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 z-10 whitespace-nowrap bg-[#333333] px-3 py-2 text-center text-xs font-ultra text-white"></TableHead>
            {tableData.headers.map((header, index) => (
              <TableHead
                key={index}
                className="whitespace-nowrap bg-[#333333] px-3 py-2 text-center text-xs font-ultra text-white"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="sticky left-0 z-10 max-h-12 min-w-16 max-w-[111px] break-words bg-[#333333] px-3 py-2 text-center text-xs font-ultra text-white">
                <div className="break-words">{row.label}</div>
              </TableCell>
              {row.values.map((value, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`text-center text-xs font-normal text-white ${
                    isAlternateHorizontal
                      ? rowIndex % 2 === 0
                        ? 'bg-black'
                        : 'bg-[#232323]'
                      : cellIndex % 2 === 0
                        ? 'bg-black'
                        : 'bg-[#232323]'
                  }`}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const formatCommissionSetting = (commissionSetting: SettingResponse['commissionSetting']) => {
  if (!commissionSetting || commissionSetting.length === 0) return null
  return commissionSetting.reduce((acc, el, index) => {
    if (index === 0) {
      // 初始化
      acc.headers = []
      acc.rows = Object.keys(el)
        .filter(key => key.startsWith('level'))
        .sort()
        .map((key, i) => ({ label: `Lv ${i + 1}`, values: [] }))
    }

    // 添加 header
    acc.headers.push(`${el.class} star`)

    // 保留未來新增新等級的空間
    acc.rows.forEach((row, i) => {
      const levelKey = `level${i + 1}` as keyof typeof el
      row.values.push(String(el[levelKey]) + '%' || '')
    })

    return acc
  }, {} as TableData)
}

const formatClassSetting = (classSetting: SettingResponse['classSetting']) => {
  if (!classSetting || classSetting.length === 0) return null

  return classSetting.reduce((acc, el, index) => {
    if (index === 0) {
      // 初始化
      acc = {
        headers: [],
        rows: [
          { label: 'Team Member Numbers', values: [] },
          { label: 'Team Member Betting amount', values: [] },
          { label: 'Team Member Deposit amount', values: [] },
        ],
      }
    }

    // 添加 header
    acc.headers.push(`${el.class} → ${el.class + 1}`)

    // 後端的值名稱跟表格的名稱不一樣 所以先寫死
    acc.rows[0].values.push(el.activeMember.toString() || '')
    acc.rows[1].values.push(
      <div className="flex items-center space-x-1">
        <Amount value={el.totalBet} crypto="USDT" />
        <span> USDT</span>
      </div>
    )
    acc.rows[2].values.push(
      <div className="flex items-center space-x-1">
        <Amount value={el.totalDeposit} crypto="USDT" />
        <span> USDT</span>
      </div>
    )
    return acc
  }, {} as TableData)
}

interface RuleSheetProps {
  teamSettingList: SettingResponse
}
const RuleSheet: React.FC<RuleSheetProps> = ({ teamSettingList }) => {
  const classSettingTable = formatClassSetting(teamSettingList.classSetting)
  const commissionSettingTable = formatCommissionSetting(teamSettingList.commissionSetting)
  const maxWidth = useStore(state => state.maxWidth)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="fixed bottom-24 z-50 cursor-pointer"
          style={{ left: `calc((100vw - ${maxWidth}) / 2)` }}
        >
          <SvgEnterByFloating imgUrl="/images/share/rule.png" imgWidth={36} imgHeight={36} />
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex h-full flex-col gap-0 overflow-y-scroll rounded-t-none bg-transparent"
      >
        <SheetHeader className="my-0 bg-transparent p-0">
          <SheetTitle className="mt-12 h-10 rounded-t-xl bg-[#1C1C1C] text-lg font-ultra leading-10">
            Rule
          </SheetTitle>
        </SheetHeader>
        <SheetClose className="top-[54px]"></SheetClose>
        <div className="flex flex-1 flex-col bg-black p-4 text-[#FFFFFFB2]">
          {/* Refer And Earn */}
          <div className="mb-6 flex flex-col space-y-2 text-sm">
            <div className="text-base font-ultra text-white">Refer And Earn</div>
            <div>Invite friends to bring you Continuous Commission!</div>
            <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-b from-[#92EE6D] to-[#007E36] p-4">
              <div className="flex flex-col items-center">
                <img src="/images/share/step-1.png" alt="step-1" className="h-[72px] w-[100px]" />
                <span className="mt-1 text-xs text-white">Invite</span>
              </div>
              <div className="mx-1 flex-1 border-t border-dashed border-black"></div>
              <div className="flex flex-col items-center">
                <img src="/images/share/step-2.png" alt="step-2" className="h-[72px] w-[100px]" />
                <span className="mt-1 text-center text-xs text-white">Make Them Play</span>
              </div>
              <div className="mx-1 flex-1 border-t border-dashed border-black"></div>
              <div className="flex flex-col items-center">
                <img src="/images/share/step-3.png" alt="step-3" className="h-[72px] w-[100px]" />
                <span className="mt-1 text-xs text-white">Earn</span>
              </div>
            </div>
            <div>Get commission on the bets from all your team member who are lv 1 to lv 2. </div>
            <div>
              Bet amount are defined as valid bets in crypto games (Mines, Crash).Valid bets will
              only be calculated for bets that have been settled and produced a win or loss result.
              Any games played, tied, or canceled will not be counted in valid bets.
            </div>
          </div>
          {/* Referral Team */}
          <div className="mb-6 flex flex-col space-y-2 text-sm">
            <div className="text-base font-ultra text-white">Referral Team</div>
            <img src="/images/share/referralDiagram.png" alt="progress-1" className="w-full" />
            <div>
              Only when your friends registered and owned over 100 KOKON in their wallet are counted
              valid member. Your team members can create a lv 1 to lv 2 Referral Team for you. The
              more members they bring in your team, the greater your income will be.
            </div>
          </div>
          {/* Team Rating System */}
          <div className="mb-6 flex flex-col space-y-2 text-sm">
            <div className="text-base font-ultra text-white">Team Rating System</div>
            <div>
              There are five rating levels from 1 star to 5 star. Every referral team starts from 1
              rating star, and you can upgrade your team rating through completing assignments. The
              higher rating your team is, the more rewards your team get.
            </div>
            <div className="text-base font-ultra text-white">Commission Ratio</div>
            <TableDemo tableData={commissionSettingTable} />
            <div className="text-base font-ultra text-white">Upgrade Requirement</div>
            <TableDemo tableData={classSettingTable} isAlternateHorizontal={false} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default RuleSheet
