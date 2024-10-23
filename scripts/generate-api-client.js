/**
 * 根據 swagger/api.json 自動生成 TypeScript 类型安全的 API 客户端腳本
 */
import fs from 'fs/promises'
import axios from 'axios'
// import { exec } from 'child_process'
import path from 'path'
// import { promisify } from 'util'
import { generateApi } from 'swagger-typescript-api'

// const execAsync = promisify(exec)

// 远程 Swagger API 文档的 URL
const swaggerUrl = 'https://tgg-website.ljbdev.site/_sys/api.json'
// 输出的类型定义目录
const outputDir = './app/api/codegen'
// Swagger JSON 文件的本地路径
const swaggerJsonPath = `${outputDir}/swagger.json`

// 下载 Swagger API 文档
async function downloadSwaggerJson(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'json' })
    await fs.writeFile(outputPath, JSON.stringify(response.data, null, 2), 'utf-8')
    console.log(`Swagger JSON downloaded to ${outputPath}`)
  } catch (error) {
    console.error(`Error downloading Swagger JSON: ${error.message}`)
  }
}

// 生成 API 类型定义
// base on openapi - typescript
// async function generateApiTypes() {
//   try {
//     const command = `npx openapi-typescript ${swaggerJsonPath} --output ${outputDir}/apiTypes.ts`
//     const { stdout, stderr } = await execAsync(command)

//     if (stderr) {
//       console.error(`Stderr: ${stderr}`)
//     }
//     console.log(`API types generated successfully:\n${stdout}`)
//   } catch (error) {
//     console.error(`Error generating API types: ${error.message}`)
//   }
// }

// base on swagger-typescript-api
async function generateApiTypesBySwaggerTypescriptApi() {
  try {
    await generateApi({
      name: 'api.ts', // 输出的文件名
      // eslint-disable-next-line no-undef
      input: path.resolve(process.cwd(), swaggerJsonPath), // 输入 Swagger JSON 文件路径
      // eslint-disable-next-line no-undef
      output: path.resolve(process.cwd(), outputDir), // 输出目录
      httpClientType: 'axios', // 使用 axios 作为 HTTP 客户端
      modular: true, // 启用模块化生成
      singleHttpClient: true, // 启用单一 httpClient 实例
      moduleNameIndex: 1, // 控制模块名称生成方式
      extractRequestParams: true, // 提取请求参数
      extractRequestBody: true, // 提取请求体
    })

    // const command = `npx swagger-typescript-api -p ${swaggerJsonPath} -o ${outputDir} --axios --modular --single-http-client --module-name-index 1`
    // // 执行 CLI 命令
    // const { stdout, stderr } = await execAsync(command)
    // if (stderr) {
    //   console.error(`Stderr: ${stderr}`)
    // }
    // console.log(`Modular API types with singleHttpClient generated successfully:\n${stdout}`)
  } catch (error) {
    console.error(`Error generating API types: ${error.message}`)
  }
}

// 检查并创建目录
async function ensureOutputDir() {
  try {
    await fs.mkdir(outputDir, { recursive: true })
    console.log(`Directory ${outputDir} is ready.`)
  } catch (error) {
    console.error(`Error creating directory ${outputDir}: ${error.message}`)
  }
}

// 主流程
async function main() {
  try {
    // 确保输出目录存在
    await ensureOutputDir()

    // 下载 Swagger JSON
    await downloadSwaggerJson(swaggerUrl, swaggerJsonPath)

    // 生成 API 类型定义
    // await generateApiTypes()
    await generateApiTypesBySwaggerTypescriptApi()
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

main()
