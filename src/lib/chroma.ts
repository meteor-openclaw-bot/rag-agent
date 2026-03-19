import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

const EMBEDDING_MODEL = 'all-MiniLM-L6-v2'

let embeddingFunction: OpenAIEmbeddingFunction | null = null
let chromaClient: ChromaClient | null = null

function getChromaClient() {
  if (!chromaClient) {
    chromaClient = new ChromaClient({ path: process.env.CHROMA_PATH || 'http://localhost:8000' })
  }
  return chromaClient
}

function getEmbeddingFunction() {
  if (!embeddingFunction) {
    embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY || '',
      openai_model: EMBEDDING_MODEL,
    })
  }
  return embeddingFunction
}

export interface Document {
  id: string
  content: string
  metadata?: Record<string, unknown>
}

export async function addDocuments(collectionName: string, documents: Document[]) {
  const client = getChromaClient()
  const embedder = getEmbeddingFunction()
  const collection = await client.getOrCreateCollection({ name: collectionName, embeddingFunction: embedder })
  
  await collection.add({
    ids: documents.map((d) => d.id),
    documents: documents.map((d) => d.content),
    metadatas: documents.map((d) => d.metadata || {}),
  })
}

export async function queryDocuments(collectionName: string, query: string, topK: number = 5) {
  const client = getChromaClient()
  const embedder = getEmbeddingFunction()
  const collection = await client.getOrCreateCollection({ name: collectionName, embeddingFunction: embedder })
  
  const results = await collection.query({
    queryTexts: [query],
    nResults: topK,
  })
  
  return results
}

export async function deleteCollection(collectionName: string) {
  const client = getChromaClient()
  await client.deleteCollection({ name: collectionName })
}
