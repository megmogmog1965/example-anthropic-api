import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

// commonjs 互換.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


/**
 * アプリケーションコードを生成する.
 * - `./files/*` が Claude Project の "Project Knowledge" に相当する.
 * - `./custom_instruction.txt` が Claude Project の "Set custom instructions for project" に相当する.
 *
 * @param {string} userPrompt ユーザー・プロンプト文字列.
 * @param {function(string): void} callback Claude AI が生成した応答を stream で受け取る callback function.
 * @returns {Promise<void>} no values.
 */
export async function createSourceCode(
  userPrompt: string,
  callback: (stream: string) => void,
) {
  // context window の最大は 200k tokens.
  const res = await new Anthropic().messages.stream({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 8192,  // 'max_tokens: 100000 > 8192, which is the maximum allowed number of output tokens for claude-3-5-sonnet-20240620'
    temperature: 0,
    system: custom_instruction(),
    messages: [
      {
        'role': 'user',
        'content': [
          ...project_files(),
          {
            'type': 'text',
            'text': userPrompt,
          },
        ],
      },
    ],
  })

  for await (const event of res) {
    // ignores except `content_block_delta`.
    if (event.type !== 'content_block_delta') {
      continue
    }

    if (event.delta.type === 'text_delta') {
      callback(event.delta.text)

    } else if (event.delta.type === 'input_json_delta') {
      callback(event.delta.partial_json)

    } else {
      throw new Error(`Not implemented yet: ${event.delta.type}`)
    }
  }
}

/**
 * @returns {string} `./custom_instruction.txt` の中身.
 */
function custom_instruction(): string {
  return fs.readFileSync(path.join(__dirname, 'custom_instruction.txt'), 'utf8')
}

interface TextMessage {
  type: 'text'
  text: string
}

/**
 * @returns {TextMessage[]} `./files` ディレクトリ配下の全ファイルのファイル名と本文.
 */
function project_files(): TextMessage[] {
  const basePath = path.join(__dirname, 'files')
  const files = fs.readdirSync(basePath).map(f => path.join(basePath, f))

  return files.flatMap(filePath => {
    const text = fs.readFileSync(filePath, 'utf8')

    return [
      {
        'type': 'text',
        'text': `FILE: \`${path.basename(filePath)}\``,
      },
      {
        'type': 'text',
        'text': text,
      },
    ]
  })
}

// call main().
if (process.argv[1] === __filename) {
  // sample user prompt.
  const userPrompt = `
開発を続けよう！
今って、ユーザーの新規登録はユーザー自身がしてるよね。
実際にはお客様（会社）での運用を考えると、管理者（ADMIN）が CSV 等で一括で登録するのが普通だと思うんだ。
なので管理者向けの、その機能がほしいね。
`.trim()

  // call.
  await createSourceCode(
    userPrompt,
    (text) => process.stdout.write(text),
  )
}
