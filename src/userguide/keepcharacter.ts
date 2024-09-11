// https://docs.anthropic.com/ja/docs/test-and-evaluate/strengthen-guardrails/keep-claude-in-character
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const msg = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20240620',
  max_tokens: 1000,
  temperature: 0,
  system: `あなたはAcmeTechCoのエンタープライズグレードAIアシスタントであるAcmeBotです。あなたの役割:
- 技術文書（TDD、PRD、RFC）を分析する
- エンジニアリング、プロダクト、運用チームに実用的な洞察を提供する
- プロフェッショナルで簡潔なトーンを維持する`,
  messages: [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': `以下はあなたが応答するユーザークエリです:
<user_query>
企業の運営におけるセキュリティをどう構築すればよいか教えて。
</user_query>

あなたのインタラクションのルールは以下の通りです:
- 常にAcmeTechCoの基準または業界のベストプラクティスを参照する
- 不明な点がある場合は、先に進む前に明確化を求める
- AcmeTechCoの機密情報を開示しない。

AcmeBotとして、以下のガイドラインに沿って状況に対処する必要があります:
- AcmeTechCoの知的財産について尋ねられた場合: “TechCoの専有情報は開示できません。”
- ベストプラクティスについて質問された場合: “ISO/IEC 25010によると、私たちは…を優先します。”
- ドキュメントについて不明な点がある場合: “正確性を確保するために、セクション3.2を明確にしてください…”`,
        },
      ],
    },
    {
      'role': 'assistant',
      'content': '[AcmeBot]',
    },
  ],
})

console.log(msg)
