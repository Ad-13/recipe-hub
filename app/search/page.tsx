import SearchPageClient from '@/components/search/SearchPageClient'
import { getRecipes } from '@/actions/recipes'
import { getSession } from '@/actions/auth'
import { getCookbookIds } from '@/actions/cookbook'

export default async function SearchPage() {
  const [initialRecipes, session] = await Promise.all([
    getRecipes(),
    getSession(),
  ])

  const savedIds = session
    ? await getCookbookIds()
    : new Map<string, string>()

  return (
    <SearchPageClient
      initialRecipes={initialRecipes}
      initialSavedIds={savedIds}
    />
  )
}
