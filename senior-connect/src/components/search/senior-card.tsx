'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { anonymizePostnummer, truncateText, getSektorLabel } from '@/lib/utils/helpers'
import Link from 'next/link'
import type { Sektor } from '@/types'

interface SeniorCardProps {
  senior: {
    id: string
    navn: string
    bio: string | null
    postnummer: string
    kommune: string | null
    sektorer: Sektor[]
    kompetanser: string[]
    tilgjengelig_fra: string | null
    onsket_timer_per_uke: number | null
  }
  hasSubscription: boolean
  onContact?: (seniorId: string) => void
}

export function SeniorCard({ senior, hasSubscription, onContact }: SeniorCardProps) {
  if (!hasSubscription) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-400">Anonym profil</CardTitle>
            <span className="text-sm text-gray-500">{anonymizePostnummer(senior.postnummer)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {senior.sektorer.map((s) => (
              <Badge key={s} variant="secondary">{getSektorLabel(s)}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {senior.kompetanser.slice(0, 3).map((k) => (
              <Badge key={k} variant="outline" className="text-xs">{k}</Badge>
            ))}
            {senior.kompetanser.length > 3 && (
              <Badge variant="outline" className="text-xs">+{senior.kompetanser.length - 3} til</Badge>
            )}
          </div>
          {senior.bio && (
            <p className="text-sm text-gray-600 mb-4">{truncateText(senior.bio, 100)}</p>
          )}
          <Link href="/arbeidsgiver/abonnement">
            <Button variant="outline" className="w-full">
              Oppgrader for å se full profil
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{senior.navn}</CardTitle>
          <span className="text-sm text-gray-500">{senior.postnummer} {senior.kommune}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {senior.sektorer.map((s) => (
            <Badge key={s} variant="secondary">{getSektorLabel(s)}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {senior.kompetanser.map((k) => (
            <Badge key={k} variant="outline" className="text-xs">{k}</Badge>
          ))}
        </div>
        {senior.bio && (
          <p className="text-sm text-gray-700 mb-3">{senior.bio}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {senior.tilgjengelig_fra && (
            <span>Tilgjengelig fra: {new Date(senior.tilgjengelig_fra).toLocaleDateString('nb-NO')}</span>
          )}
          {senior.onsket_timer_per_uke && (
            <span>{senior.onsket_timer_per_uke} timer/uke</span>
          )}
        </div>
        <Button
          className="w-full"
          onClick={() => onContact?.(senior.id)}
        >
          Kontakt
        </Button>
      </CardContent>
    </Card>
  )
}
