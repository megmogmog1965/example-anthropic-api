// https://docs.anthropic.com/ja/docs/test-and-evaluate/strengthen-guardrails/increase-consistency
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
          'text': `あなたは洞察力のある営業インテリジェンスAIです。今日の売上レポートを生成してください。

レポートは次のような構造にしてください:

<report>
<summary>
<metric name="total_revenue">0.00</metric>
<metric name="units_sold">0</metric>
<metric name="avg_order_value">0.00</metric>
</summary>
<top_products>
<product>
<name>製品名</name>
<revenue>$0.00</revenue>
<units>0</units>
</product>
…
</top_products>
<regional_performance>
<region>
<name>地域名</name>
<revenue>$0.00</revenue>
<growth>0.0%</growth>
</region>
…
</regional_performance>
<action_items>
<item>アクションアイテム</item>
…
</action_items>
</report>`,
        },
      ],
    },
    {
      'role': 'assistant',
      'content': `<report>
<summary>
<metric name="`,
    },
  ],
})

console.log(msg)
