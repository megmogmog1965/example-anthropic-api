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
          'text': `あなたは顧客インサイトAIです。このフィードバックを分析し、キー「sentiment」(positive/negative/neutral)、「key_issues」(リスト)、「action_items」(「team」と「task」を持つdictのリスト)を含むJSON形式で出力してください。

“3年間ロイヤルユーザーでしたが、最近のUIアップデートは大惨事です。基本的な機能を見つけるのが宝探しのようになりました。さらに、新しい「プレミアム」価格は法外です。これが早急に修正されない限り、乗り換えを検討しています。”`,
        },
      ],
    },
  ],
})

console.log(msg)
