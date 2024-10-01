import { useTranslation } from 'react-i18next'

export default function I18next() {
  const { t } = useTranslation()
  return (
    <div className="container px-0">
      <div className="flex flex-col gap-2">
        {/* 顯示簡單鍵值對示例 */}
        <h2 className="text-lg font-bold">簡單鍵值對</h2>
        <div>{t('key')}</div> {/* 輸出: "value" */}
        {/* 顯示嵌套鍵值對示例 */}
        <h2 className="text-lg font-bold">嵌套鍵值對</h2>
        <div>{t('keyDeep.inner')}</div> {/* 輸出: "value" */}
        {/* 顯示文字內容的重用示例 */}
        <h2 className="text-lg font-bold">文字內容的重用</h2>
        <div>{t('keyNesting')}</div> {/* 輸出: "reuse value" */}
        {/* 顯示插值，替換佔位符示例 */}
        <h2 className="text-lg font-bold">插值，替換佔位符</h2>
        <div>{t('keyInterpolate', { value: '動態值' })}</div> {/* 輸出: "replace this 動態值" */}
        {/* 顯示未轉義的插值，插入HTML示例 */}
        <h2 className="text-lg font-bold">未轉義的插值，插入HTML</h2>
        <div>{t('keyInterpolateUnescaped', { value: '<span>動態值</span>' })}</div>{' '}
        {/* 未轉義的插值，插入HTML - 示例1 */}
        <h2 className="text-lg font-bold">未轉義的插值，插入HTML - 紅色動態值</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: t('keyInterpolateUnescaped', {
              value: '<span class="text-red-500">紅色動態值</span>',
            }),
          }}
        ></div>
        {/* 未轉義的插值，插入HTML - 示例3 */}
        <h2 className="text-lg font-bold">未轉義的插值，插入HTML - 藍色粗體動態值</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: t('keyInterpolateUnescaped', {
              value: '<span class="text-blue-500 font-bold">藍色粗體動態值</span>',
            }),
          }}
        ></div>
        {/* 顯示插值格式化，適用於數據格式示例 */}
        <h2 className="text-lg font-bold">插值格式化，適用於數據格式</h2>
        <div>{t('keyInterpolateWithFormatting', { value: new Date(), format: 'long' })}</div>{' '}
        {/* 輸出格式化的日期 */}
        {/* 顯示上下文變化處理（性別）示例 */}
        <h2 className="text-lg font-bold">上下文變化處理（性別）</h2>
        <div>{t('keyContext', { context: 'male' })}</div> {/* 輸出: "the male variant" */}
        <div>{t('keyContext', { context: 'female' })}</div> {/* 輸出: "the female variant" */}
        {/* 顯示單複數處理示例 */}
        <h2 className="text-lg font-bold">單複數處理</h2>
        <div>{t('keyPluralSimple', { count: 1 })}</div> {/* 輸出: "the singular" */}
        <div>{t('keyPluralSimple', { count: 5 })}</div> {/* 輸出: "the plural" */}
        {/* 顯示複雜的多語言複數處理（如阿拉伯語）示例 */}
        <h2 className="text-lg font-bold">複雜的多語言複數處理（如阿拉伯語）</h2>
        <div>{t('keyPluralMultipleEgArabic', { count: 0 })}</div> {/* 輸出: "the plural form 0" */}
        <div>{t('keyPluralMultipleEgArabic', { count: 1 })}</div> {/* 輸出: "the plural form 1" */}
        <div>{t('keyPluralMultipleEgArabic', { count: 2 })}</div> {/* 輸出: "the plural form 2" */}
        <div>{t('keyPluralMultipleEgArabic', { count: 3 })}</div> {/* 輸出: "the plural form 3" */}
        <div>{t('keyPluralMultipleEgArabic', { count: 4 })}</div> {/* 輸出: "the plural form 4" */}
        <div>{t('keyPluralMultipleEgArabic', { count: 5 })}</div> {/* 輸出: "the plural form 5" */}
        {/* 顯示使用陣列值示例 */}
        <h2 className="text-lg font-bold">使用陣列值</h2>
        <div>{t('keyWithArrayValue.0')}</div> {/* 輸出: "multiple" */}
        <div>{t('keyWithArrayValue.1')}</div> {/* 輸出: "things" */}
        {/* 顯示使用對象值示例 */}
        <h2 className="text-lg font-bold">使用對象值</h2>
        <div>{t('keyWithObjectValue.valueA')}</div> {/* 輸出: "return this with valueB" */}
        <div>{t('keyWithObjectValue.valueB')}</div> {/* 輸出: "more text" */}
      </div>
    </div>
  )
}
