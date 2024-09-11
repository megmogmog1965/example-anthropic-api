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
          'text': `当社のデータ保護責任者として、このプライバシーポリシーの更新版をGDPRとCCPAに準拠しているかレビューしてください。
<policy>
プライバシーポリシー

1. aaa
2. bbb
3. ccc
</policy>

1. GDPRとCCPAの遵守に最も関連するポリシーから正確な引用を抽出します。関連する引用が見つからない場合は、「関連する引用が見つかりませんでした」と記述してください。

2. 抽出した引用を使用して、これらのポリシーセクションの遵守状況を分析し、引用を番号で参照してください。抽出した引用のみに基づいて分析を行ってください。`,
        },
      ],
    },
  ],
})

console.log(msg)
