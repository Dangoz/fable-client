// import { openai } from '@ai-sdk/openai'
import { groq } from '@ai-sdk/groq'
import { streamText, tool } from 'ai'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { constructCharacterSystem } from '@/lib/ai/character-system'
export const maxDuration = 30
// import { PrivyClient } from '@privy-io/server-auth'

// Initialize Privy client with app ID and secret from environment variables
// const privy = new PrivyClient(process.env.PRIVY_APP_ID as string, process.env.PRIVY_APP_SECRET as string)

export async function POST(req: Request) {
  try {
    // const cookieStore = await cookies()
    // const accessToken = cookieStore.get('privy-token')?.value ?? ''
    // const verifiedClaims = await privy.verifyAuthToken(accessToken)
    // console.log('🛠️ ===== VERIFIED CLAIMS USER EMAIL ===== 🛠️', verifiedClaims?.userId)
    // if (!verifiedClaims) {
    //   return new Response('Unauthorized', { status: 401 })
    // }

    const body = await req.json()
    if (!body?.messages?.length) {
      return new Response('Invalid request', { status: 400 })
    }
    const { messages } = body
    const agentSystem = constructCharacterSystem()

    const result = streamText({
      model: groq('deepseek-r1-distill-llama-70b'),
      system: agentSystem,
      messages,
      tools: {
        addResource: tool({
          description: `Record the user's preferences, hobbies, ideas, etc. Add them to your knowledge base.`,
          parameters: z.object({
            content: z.string().describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => {
            console.log('🛠️ ===== INITIALIZING ADD RESOURCE TOOL ===== 🛠️')
            // await createResource({ content })
            return 'Resource added to knowledge base'
          },
        }),
        getInformation: tool({
          description: `get information from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => {
            console.log('🛠️ ===== INITIALIZING GET INFORMATION TOOL ===== 🛠️')
            // const relevantContent = await findRelevantContent(question)
            return 'Information retrieved from knowledge base'
          },
        }),
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
