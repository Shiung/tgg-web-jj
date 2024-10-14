import { format } from 'date-fns'

/**
 * 安全格式化日期
 * @param date 從後端傳來的日期，可以是 Date、number、string 或無效值 (null, undefined, 空字符串)
 * @param formatStr 格式化日期的樣式 (默認 'yyyy-MM-dd')
 * @param defaultValue 當日期無效時顯示的默認值 (默認為空字符串)
 * @returns 格式化後的日期或默認值
 */
export function formatDate(
  date: Date | number | string | null | undefined,
  formatStr: string = 'yyyy-MM-dd',
  defaultValue: string = ''
): string {
  if (!date || isNaN(new Date(date).getTime())) {
    return defaultValue
  }
  return format(new Date(date), formatStr)
}
