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
import ora from 'ora'

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
  fs.readFileSync(path.join(__dirname, '../public/locales/en.json'), 'utf8')
)

const isDebugMode = false

async function translateBatch(textArray, targetLang, spinner) {
  if (isDebugMode) {
    console.log(`调试模式：模拟批量翻译 ${textArray.length} 条文字...`)
    // 模拟翻译结果，直接返回原始文本
    return textArray.map(text => `[翻译结果: ${text}]`)
  }

  try {
    spinner.text = `正在批量翻譯 ${textArray.length} 條文字...`
    const result = await translator.translateText(textArray, null, targetLang)
    return result.map(r => r.text)
  } catch (error) {
    spinner.fail(`批量翻译失败，错误信息：${error.message}`)
    throw error
  }
}

async function translateText(text, targetLang, key, spinner, depth = 0, batch = []) {
  const MAX_DEPTH = 1000
  if (depth > MAX_DEPTH) {
    throw new Error(`递归深度超出最大限制: ${MAX_DEPTH}，key: ${key}`)
  }

  switch (typeof text) {
    case 'string': {
      const placeholders = []
      const protectedText = text
        .replace(/\$t\([^)]+\)/g, match => {
          placeholders.push(match)
          return `__PLACEHOLDER_${placeholders.length - 1}__`
        })
        .replace(/{{[^}]+}}/g, match => {
          placeholders.push(match)
          return `__PLACEHOLDER_${placeholders.length - 1}__`
        })

      batch.push({ key, protectedText, placeholders })
      return null // 暂时返回 null，稍后处理翻译结果
    }

    case 'object': {
      if (Array.isArray(text)) {
        const translatedArray = []
        for (const [index, item] of text.entries()) {
          translatedArray.push(
            await translateText(item, targetLang, `${key}[${index}]`, spinner, depth + 1, batch)
          )
        }
        return translatedArray
      } else if (text !== null) {
        const translatedObject = {}
        for (const subKey in text) {
          translatedObject[subKey] = await translateText(
            text[subKey],
            targetLang,
            `${key}.${subKey}`,
            spinner,
            depth + 1,
            batch
          )
        }
        return translatedObject
      } else {
        throw new Error(`Unsupported data type: ${typeof text}`)
      }
    }

    default:
      throw new Error(`Unsupported data type: ${typeof text}`)
  }
}

async function translateAndSave() {
  const spinner = ora('開始翻譯...').start()

  for (const lang of languages) {
    const translatedContent = {}
    const batch = []

    for (const key of Object.keys(enTranslations)) {
      await translateText(enTranslations[key], lang, key, spinner, 0, batch)
    }

    isDebugMode && console.log('批量翻譯文本:', batch)

    // 大量翻譯
    const batchTextArray = batch.map(item => item.protectedText)
    const batchResults = await translateBatch(batchTextArray, lang, spinner)

    isDebugMode && console.log('翻譯結果:', batchResults)

    // 處理批量翻譯結果
    batch.forEach((item, index) => {
      let translatedText = batchResults[index]
      item.placeholders.forEach((placeholder, i) => {
        translatedText = translatedText.replace(`__PLACEHOLDER_${i}__`, placeholder)
      })
      translatedContent[item.key] = translatedText
    })

    const outputPath = path.join(__dirname, `../public/locales/${lang}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(translatedContent, null, 2))
    spinner.succeed(`翻譯至 ${lang} 完成，並已儲存至 ${outputPath}。`)
  }

  spinner.stop()
}

translateAndSave().catch(error => {
  console.error('翻譯過程中出現錯誤：', error)
  process.exit(1)
})
