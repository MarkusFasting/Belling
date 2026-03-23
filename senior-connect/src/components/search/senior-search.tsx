'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from './search-filters'
import { SeniorCard } from './senior-card'
import { ContactSeniorForm } from '@/components/forms/contact-senior-form'
import { Button } from '@/components/ui/button'
import type { SearchResult } from '@/types'

interface SeniorSearchProps {
  initialResults: SearchResult[]
  totalCount: number
  hasSubscription: boolean
  currentPage: number
  pageSize: number
}

export function SeniorSearch({
  initialResults,
  totalCount,
  hasSubscription,
  currentPage,
  pageSize,
}: SeniorSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [contactSeniorId, setContactSeniorId] = useState<string | null>(null)
  const [contactSeniorNavn, setContactSeniorNavn] = useState<string | null>(null)

  const totalPages = Math.ceil(totalCount / pageSize)

  const handleContact = (seniorId: string) => {
    const senior = initialResults.find((s) => s.id === seniorId)
    setContactSeniorId(seniorId)
    setContactSeniorNavn(senior?.navn ?? null)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('side', page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <SearchFilters />
      </aside>

      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base text-gray-600">
            {totalCount} {totalCount === 1 ? 'senior' : 'seniorer'} funnet
          </p>
        </div>

        {initialResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              Ingen seniorer funnet med valgte filtre.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Prov a justere filtrene for a fa flere resultater.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialResults.map((senior) => (
                <SeniorCard
                  key={senior.id}
                  senior={senior}
                  hasSubscription={hasSubscription}
                  onContact={handleContact}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Forrige
                </Button>
                <span className="text-sm text-gray-600 px-4">
                  Side {currentPage} av {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Neste
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <ContactSeniorForm
        open={contactSeniorId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setContactSeniorId(null)
            setContactSeniorNavn(null)
          }
        }}
        seniorId={contactSeniorId}
        seniorNavn={contactSeniorNavn}
      />
    </div>
  )
}
