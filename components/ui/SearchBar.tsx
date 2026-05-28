'use client'

import { useRef } from 'react'
import { Search } from 'lucide-react'
import debounce from '@/utils/debounce'

type Props = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const debouncedSearch = useRef(
    debounce((value: string) => {
      onSearch(value)
    }, 400)
  ).current

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={18} className="text-text-dim" />
      </div>
      <input
        type="text"
        placeholder="Search recipes by name, ingredient, tag..."
        onChange={(e) => debouncedSearch(e.target.value)}
        className="input-field w-full pl-11 pr-4 py-3 text-base"
      />
    </div>
  )
}