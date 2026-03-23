'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/actions/auth'
import { createEmployerProfile, lookupOrgNr } from '@/actions/employer'
import { SEKTORER } from '@/lib/utils/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function EmployerRegistrationPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [lookingUp, setLookingUp] = useState(false)

  // Auth fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Company fields
  const [orgNr, setOrgNr] = useState('')
  const [firmanavn, setFirmanavn] = useState('')
  const [postnummer, setPostnummer] = useState('')
  const [kontaktperson, setKontaktperson] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sektor, setSektor] = useState('')

  async function handleLookup() {
    if (!/^\d{9}$/.test(orgNr)) {
      setError('Organisasjonsnummer må være 9 siffer')
      return
    }

    setLookingUp(true)
    setError(null)

    const result = await lookupOrgNr(orgNr)
    if (result.success) {
      setFirmanavn(result.data.navn)
      if (result.data.postnummer) {
        setPostnummer(result.data.postnummer)
      }
    } else {
      setError(result.error)
    }

    setLookingUp(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Step 1: Create user account
      const signUpData = new FormData()
      signUpData.set('email', email)
      signUpData.set('password', password)
      signUpData.set('role', 'employer')

      const signUpResult = await signUp(signUpData)
      if (!signUpResult.success) {
        setError(signUpResult.error)
        setLoading(false)
        return
      }

      // Step 2: Create employer profile
      const profileData = new FormData()
      profileData.set('org_nr', orgNr)
      profileData.set('firmanavn', firmanavn)
      profileData.set('kontaktperson', kontaktperson)
      profileData.set('epost', email)
      profileData.set('telefon', telefon)
      profileData.set('postnummer', postnummer)
      if (sektor) profileData.set('sektor', sektor)

      const profileResult = await createEmployerProfile(profileData)
      if (!profileResult.success) {
        setError(profileResult.error)
        setLoading(false)
        return
      }

      router.push('/bekreft-epost')
    } catch {
      setError('Noe gikk galt. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Registrer som arbeidsgiver</CardTitle>
          <CardDescription>Opprett bedriftskonto og finn erfarne seniorer</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Auth section */}
            <div className="space-y-2">
              <Label htmlFor="email">E-post *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="firma@epost.no"
                required
                autoComplete="email"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passord *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
                className="text-base"
              />
              <p className="text-sm text-gray-500">Minst 8 tegn</p>
            </div>

            {/* Org.nr with lookup */}
            <div className="space-y-2">
              <Label htmlFor="org_nr">Organisasjonsnummer *</Label>
              <div className="flex gap-2">
                <Input
                  id="org_nr"
                  type="text"
                  value={orgNr}
                  onChange={(e) => setOrgNr(e.target.value)}
                  placeholder="123456789"
                  required
                  maxLength={9}
                  inputMode="numeric"
                  className="text-base flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLookup}
                  disabled={lookingUp || orgNr.length !== 9}
                  className="text-base"
                >
                  {lookingUp ? 'Søker...' : 'Slå opp'}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Slå opp org.nr. for å fylle ut firmanavn automatisk
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firmanavn">Firmanavn *</Label>
              <Input
                id="firmanavn"
                type="text"
                value={firmanavn}
                onChange={(e) => setFirmanavn(e.target.value)}
                placeholder="Firmanavn AS"
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kontaktperson">Kontaktperson *</Label>
              <Input
                id="kontaktperson"
                type="text"
                value={kontaktperson}
                onChange={(e) => setKontaktperson(e.target.value)}
                placeholder="Kari Nordmann"
                required
                autoComplete="name"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefon">Telefon *</Label>
              <Input
                id="telefon"
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="12345678"
                required
                autoComplete="tel"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postnummer">Postnummer</Label>
              <Input
                id="postnummer"
                type="text"
                value={postnummer}
                onChange={(e) => setPostnummer(e.target.value)}
                placeholder="0001"
                maxLength={4}
                inputMode="numeric"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sektor">Sektor</Label>
              <select
                id="sektor"
                value={sektor}
                onChange={(e) => setSektor(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Velg sektor</option>
                {SEKTORER.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full text-base" size="lg" disabled={loading}>
              {loading ? 'Oppretter konto...' : 'Opprett bedriftskonto'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Har du allerede konto?{' '}
              <Link href="/logg-inn" className="text-blue-600 hover:underline font-medium">
                Logg inn
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
