import { neon } from '@neondatabase/serverless'
import { ActionResult } from '@/types'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.DATABASE_URL)

// Generic typed query helper
export async function query<T>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<ActionResult<T>> {
  const results = await sql(strings, ...values)
  return { data: results as T }
}
