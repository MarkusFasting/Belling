'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SEKTORER } from '@/lib/utils/constants'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentQuery = searchParams.get('q') ?? ''
  const currentSektorer = searchParams.getAll('sektor')
  const currentPostnummer = searchParams.get('postnummer') ?? ''
  const currentMinTimer = searchParams.get('min_timer') ?? ''
  const currentMaxTimer = searchParams.get('max_timer') ?? ''
  const currentSort = searchParams.get('sort') ?? 'relevance'

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        params.delete(key)
        if (value === null || value === '') continue
        if (Array.isArray(value)) {
          for (const v of value) {
            params.append(key, v)
          }
        } else {
          params.set(key, value)
        }
      }

      // Reset to page 1 on filter change
      params.delete('side')

      startTransition(() => {
        router.push(`?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const handleSektorToggle = (sektor: string, checked: boolean) => {
    const updated = checked
      ? [...currentSektorer, sektor]
      : currentSektorer.filter((s) => s !== sektor)
    updateParams({ sektor: updated })
  }

  const handleReset = () => {
    startTransition(() => {
      router.push('?')
    })
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border">
      <div>
        <Label htmlFor="search-query" className="text-base font-semibold">
          Fritekst-sok
        </Label>
        <Input
          id="search-query"
          type="search"
          placeholder="Sok etter kompetanse, erfaring..."
          defaultValue={currentQuery}
          onChange={(e) => {
            const value = e.target.value
            if (value.length === 0 || value.length >= 2) {
              updateParams({ q: value || null })
            }
          }}
          className="mt-1 text-base"
        />
      </div>

      <div>
        <p className="text-base font-semibold mb-2">Sektor</p>
        <div className="space-y-2">
          {SEKTORER.map((sektor) => (
            <div key={sektor.value} className="flex items-center space-x-2">
              <Checkbox
                id={`sektor-${sektor.value}`}
                checked={currentSektorer.includes(sektor.value)}
                onCheckedChange={(checked) =>
                  handleSektorToggle(sektor.value, checked === true)
                }
              />
              <Label
                htmlFor={`sektor-${sektor.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {sektor.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="postnummer-filter" className="text-base font-semibold">
          Postnummer / region
        </Label>
        <Input
          id="postnummer-filter"
          type="text"
          placeholder="F.eks. 0150 eller 01"
          defaultValue={currentPostnummer}
          maxLength={4}
          onChange={(e) => {
            updateParams({ postnummer: e.target.value || null })
          }}
          className="mt-1 text-base"
        />
      </div>

      <div>
        <p className="text-base font-semibold mb-2">Timer per uke</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            defaultValue={currentMinTimer}
            min={0}
            max={40}
            onChange={(e) => updateParams({ min_timer: e.target.value || null })}
            className="w-20 text-base"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Maks"
            defaultValue={currentMaxTimer}
            min={0}
            max={40}
            onChange={(e) => updateParams({ max_timer: e.target.value || null })}
            className="w-20 text-base"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="sort-select" className="text-base font-semibold">
          Sortering
        </Label>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger id="sort-select" className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevans</SelectItem>
            <SelectItem value="newest">Nyeste forst</SelectItem>
            <SelectItem value="availability">Tilgjengelighet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        className="w-full"
        onClick={handleReset}
        disabled={isPending}
      >
        Nullstill filtre
      </Button>
    </div>
  )
}
