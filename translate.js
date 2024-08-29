/**
 * 翻譯腳本
 * 使用 DeepL API 將 en.json 中的文本翻譯成指定的目標語言
 * pnpm translate
 */
/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as deepl from 'deepl-node'

// DeepL API 密鑰
const authKey = '90065e48-3a44-4575-b27b-920656295cb0:fx'

if (!authKey) {
  console.error('缺少 DeepL API 密鑰。')
  process.exit(1)
}

// 初始化 DeepL 翻譯客戶端
const translator = new deepl.Translator(authKey, {
  timeout: 15000, // 設置超時為 15 秒
})

// 將 __dirname 等效實現放在 ES 模組環境中
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 要翻譯的語言列表
const languages = ['es', 'fr', 'ar', 'ja', 'ko'] // 目標語言代碼（ISO 639-1 標準）

// 讀取原始的 en.json 文件
const enTranslations = JSON.parse(
  fs.readFileSync(path.join(__dirname, './public/locales/en.json'), 'utf8')
)

async function translateText(text, targetLang) {
  try {
    const result = await translator.translateText(text, null, targetLang)
    return result.text
  } catch (error) {
    console.error(`翻譯失敗：${error.message}`)
    throw error
  }
}

async function translateAndSave() {
  for (const lang of languages) {
    const translatedContent = {}

    for (const key of Object.keys(enTranslations)) {
      translatedContent[key] = await translateText(enTranslations[key], lang)
    }

    // 保存翻譯結果到對應的語言文件
    const outputPath = path.join(__dirname, `./public/locales/${lang}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(translatedContent, null, 2))
    console.log(`翻譯至 ${lang} 完成，並已保存至 ${outputPath}。`)
  }
}

translateAndSave().catch((error) => {
  console.error('翻譯過程中出現錯誤：', error)
  process.exit(1)
})
