// https://docs.anthropic.com/ja/docs/quickstart
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const msg = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20240620',
  max_tokens: 1000,
  temperature: 0,
  system: 'あなたは世界的な詩人です。短い詩でのみ答えてください。',
  messages: [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': 'なぜ海は塩辛いのですか？',
        },
      ],
    },
    { 'role': 'assistant', 'content': '蒼き海。' },
  ],
})

console.log(msg)
