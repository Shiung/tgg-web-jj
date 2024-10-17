interface TeamMember {
  lv: number
  name: string
  totalBets: string
  totalDeposits: string
}

interface TeamData {
  data: {
    data: TeamMember[]
    pagination: {
      pageSize: number
      totalPage: number
      totalRecord: number
    }
    summary: {
      teamSize: number
      totalBets: string
      totalDeposit: string
    }
  }
}

const totalRecords = 100 // 假設總共有100條記錄
let callCount = 0

function generateRandomTeamData(page: number, pageSize: number = 20, queryParams: any): TeamData {
  const totalPages = Math.ceil(totalRecords / pageSize)

  const data: TeamMember[] = []
  let totalBets = 0
  let totalDeposits = 0

  for (let i = 0; i < pageSize; i++) {
    const anchorPoint = callCount * pageSize + i + 1
    const lv = Math.floor(Math.random() * 4) + 1
    const bets = parseFloat((Math.random() * 10000).toFixed(2))
    const deposits = parseFloat((Math.random() * 20000).toFixed(2))

    data.push({
      lv,
      name: `用户${anchorPoint}-${callCount}`,
      totalBets: bets.toFixed(2),
      totalDeposits: deposits.toFixed(2),
    })

    totalBets += bets
    totalDeposits += deposits
  }

  callCount++

  const result: TeamData = {
    data: {
      data,
      summary: {
        teamSize: callCount * pageSize,
        totalBets: totalBets.toFixed(2),
        totalDeposit: totalDeposits.toFixed(2),
      },
      pagination: {
        pageSize: pageSize,
        totalPage: totalPages,
        totalRecord: totalRecords,
      },
    },
  }

  console.log('生成的数据:', result)

  return result
}

// 模拟 API 调用
async function fetchTeamData(
  page: number,
  pageSize: number = 20,
  queryParams: any
): Promise<TeamData> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  return generateRandomTeamData(page, pageSize, queryParams)
}

export default fetchTeamData
