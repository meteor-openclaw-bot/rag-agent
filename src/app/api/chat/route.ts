import { NextRequest, NextResponse } from 'next/server'
import { getAllKnowledge } from '@/lib/knowledge-base'

export const runtime = 'nodejs'
export const maxDuration = 60

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function buildPrompt(context: string, query: string, history: Message[]) {
  const systemPrompt = `你是简历优化助手，擅长用 STAR 法则优化简历描述，结合知识库给出专业建议。
参考知识库：
${context}

回答要求：
1. 结合用户输入的原始描述和知识库中的案例
2. 使用 STAR 法则优化
3. 量化成果（如果原描述没有，给出合理估算）
4. 保持专业、简洁
5. 如果用户问的不是简历相关，礼貌引导回简历话题`

  const historyText = history
    .slice(-6)
    .map((m) => `${m.role === 'user' ? '用户' : '助手'}: ${m.content}`)
    .join('\n')

  return `${systemPrompt}\n\n历史对话：\n${historyText}\n\n用户: ${query}\n助手:`
}

async function generateResponse(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    return '请配置 OPENAI_API_KEY 环境变量'
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.choices[0]?.message?.content || '生成失败'
  } catch (error) {
    console.error('OpenAI error:', error)
    return '抱歉，生成回复时出错'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, history } = await request.json() as { query: string; history: Message[] }
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }
    
    // Get relevant knowledge (simplified - in production use ChromaDB)
    const knowledge = getAllKnowledge()
    const context = knowledge.map((k) => `[${k.category}] ${k.content}`).join('\n')
    
    // Build prompt
    const prompt = buildPrompt(context, query, history || [])
    
    // Generate response
    const response = await generateResponse(prompt)
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
