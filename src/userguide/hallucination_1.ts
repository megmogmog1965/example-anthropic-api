// https://docs.anthropic.com/ja/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
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
          'text': `当社のM&Aアドバイザーとして、ExampleCorpによるAcmeCoの買収可能性に関するこのレポートを分析してください。

<report>
この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れていま
</report>

財務予測、統合リスク、規制上の障壁に焦点を当ててください。何らかの側面について確信が持てない場合や、レポートに必要な情報が不足している場合は、「これを自信を持って評価するのに十分な情報がありません」と言ってください。`,
        },
      ],
    },
  ],
})

console.log(msg)
