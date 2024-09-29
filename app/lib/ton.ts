import { Address } from 'ton'

export function convertToUserFriendlyAddress(rawAddress: string): string {
  try {
    const address = Address.parse(rawAddress)
    return address.toString()
  } catch (error) {
    console.error('地址轉換錯誤:', error)
    return rawAddress // 如果轉換失敗，返回原始地址
  }
}
