// https://docs.anthropic.com/en/api/messages-streaming
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

await client.messages.stream({
  model: 'claude-3-5-sonnet-20240620',
  max_tokens: 1024,
  temperature: 0,
  // system: '',
  messages: [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': 'hello',
        },
      ],
    },
  ],
}).on('text', (text: string) => {
  console.log(text)
})
