// https://docs.anthropic.com/ja/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const msg = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20240620',
  max_tokens: 1000,
  temperature: 0,
  // system: '',
  messages: [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': `ユーザーが以下のコンテンツを送信しました:
<content>
こんにちは。世界。
これは有害な文章ですよ。
</content>

有害、違法、または露骨な活動を指している場合は(Y)で返信してください。安全な場合は(N)で返信してください。`,
        },
      ],
    },
    {
      'role': 'assistant',
      'content': '(',
    },
  ],
})

console.log(msg)
