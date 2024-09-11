// https://docs.anthropic.com/ja/docs/build-with-claude/tool-use
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const msg = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20240620',
  max_tokens: 1024,
  tools: [
    {
      'name': 'get_weather',
      'description': '指定された場所の現在の天気を取得します',
      'input_schema': {
        'type': 'object',
        'properties': {
          'location': {
            'type': 'string',
            'description': '都市と州、例: San Francisco, CA',
          },
        },
        'required': ['location'],
      },
    },
  ],
  messages: [
    {
      'role': 'user',
      'content': 'ロサンゼルスの天気はどうですか？',
    },
    {
      'role': 'assistant',
      'content': [
        {
          type: 'text',
          text: 'ロサンゼルスの天気を確認するために、get_weather関数を使用して現在の天気情報を取得しましょう。',
        },
        {
          type: 'tool_use',
          id: 'toolu_01HcWdBMWGBr4V1iURXFdLHn',
          name: 'get_weather',
          input: { 'location': 'Los Angeles, CA' },
        },
      ],
    },
    {
      'role': 'user',
      'content': [
        {
          'type': 'tool_result',
          'tool_use_id': 'toolu_01HcWdBMWGBr4V1iURXFdLHn',
          'content': '晴天',
        },
      ],
    },
  ],
})

console.log(JSON.stringify(msg, null, '  '))
