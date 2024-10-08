interface CommissionItem {
  betAmount: string
  commissionAmount: string
  createTime: string
  displayName: string
  level: number
  memberId: number
  sendStatus: number
}

interface CommissionResponse {
  data: {
    list: CommissionItem[]
    pagination: {
      pageSize: number
      totalPage: number
      totalRecord: number
    }
    summary: {
      totalBet: string
      totalCommission: string
      totalCount: number
    }
  }
}

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const generateCommissionItem = (): CommissionItem => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const randomDate = generateRandomDate(thirtyDaysAgo, now)

  return {
    betAmount: (Math.random() * 10000 + 1000).toFixed(6),
    commissionAmount: (Math.random() * 1000 + 100).toFixed(2),
    createTime: randomDate.toISOString(),
    displayName: `用戶${Math.floor(Math.random() * 1000)}`,
    level: Math.floor(Math.random() * 4) + 1,
    memberId: Math.floor(Math.random() * 10000) + 1000,
    sendStatus: Math.floor(Math.random() * 2),
  }
}

export const generateMockCommissionData = (
  page: number,
  pageSize: number = 20
): CommissionResponse => {
  const totalRecords = 100 // 假設總共有100條記錄
  const totalPages = Math.ceil(totalRecords / pageSize)

  const list: CommissionItem[] = []
  for (let i = 0; i < pageSize; i++) {
    list.push(generateCommissionItem())
  }

  // 按日期排序
  list.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

  return {
    data: {
      list,
      pagination: {
        pageSize,
        totalPage: totalPages,
        totalRecord: totalRecords,
      },
      summary: {
        totalBet: (Math.random() * 1000000 + 100000).toFixed(2),
        totalCommission: (Math.random() * 100000 + 10000).toFixed(2),
        totalCount: totalRecords,
      },
    },
  }
}

export const getMockCommissionData = (page: number, pageSize: number = 20) => {
  return new Promise<CommissionResponse>(resolve => {
    setTimeout(() => {
      resolve(generateMockCommissionData(page, pageSize))
    }, 500) // 模擬 500ms 的網絡延遲
  })
}
