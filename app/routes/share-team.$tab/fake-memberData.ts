interface TeamMember {
  anchorPoint: number
  lv: number
  name: string
  totalBets: string
  totalDeposits: string
}

interface TeamData {
  data: {
    anchorPoint: number
    data: TeamMember[]
    summary: {
      teamSize: number
      totalBets: string
      totalDeposit: string
    }
  }
}

const PAGE_SIZE = 20
const MAX_CALLS = 5 // 設置最大調用次數

let callCount = 0
let lastQueryParams: any = null

function generateRandomTeamData(lastAnchorPoint: number = 0, queryParams: any): TeamData {
  console.log('模拟 API 调用，queryParams:', queryParams)
  console.log('当前 anchorPoint:', lastAnchorPoint)

  // 檢查搜索條件是否改變，如果改變則重置 callCount
  if (JSON.stringify(queryParams) !== JSON.stringify(lastQueryParams)) {
    callCount = 0
    lastQueryParams = JSON.parse(JSON.stringify(queryParams))
  }

  console.log('调用次数:', callCount + 1)

  if (callCount >= MAX_CALLS) {
    console.log('已达到最大调用次数，返回空数据')
    return {
      data: {
        anchorPoint: lastAnchorPoint,
        data: [],
        summary: {
          teamSize: 0,
          totalBets: '0',
          totalDeposit: '0',
        },
      },
    }
  }

  // 随机生成 1 到 3 页的数据
  const pagesToGenerate = Math.floor(Math.random() * 3) + 1
  const totalItems = pagesToGenerate * PAGE_SIZE

  const data: TeamMember[] = []
  let totalBets = 0
  let totalDeposits = 0

  for (let i = 0; i < totalItems; i++) {
    const anchorPoint = lastAnchorPoint + i + 1
    const lv = Math.floor(Math.random() * 4) + 1
    const bets = parseFloat((Math.random() * 10000).toFixed(2))
    const deposits = parseFloat((Math.random() * 20000).toFixed(2))

    data.push({
      anchorPoint,
      lv,
      name: `用户${anchorPoint}`,
      totalBets: bets.toFixed(2),
      totalDeposits: deposits.toFixed(2),
    })

    totalBets += bets
    totalDeposits += deposits
  }

  callCount++

  const result: TeamData = {
    data: {
      anchorPoint: lastAnchorPoint + totalItems,
      data,
      summary: {
        teamSize: callCount * totalItems,
        totalBets: totalBets.toFixed(2),
        totalDeposit: totalDeposits.toFixed(2),
      },
    },
  }

  console.log('生成的数据:', result)
  console.log('生成的页数:', pagesToGenerate)

  return result
}

// 模拟 API 调用
async function fetchTeamData(anchorPoint: number = 0, queryParams: any): Promise<TeamData> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  return generateRandomTeamData(anchorPoint, queryParams)
}

export default fetchTeamData
