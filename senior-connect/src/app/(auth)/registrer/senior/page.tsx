'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/actions/auth'
import { createSeniorProfile } from '@/actions/senior'
import { SEKTORER } from '@/lib/utils/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const TOTAL_STEPS = 3

export default function SeniorRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Step 1 fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [navn, setNavn] = useState('')
  const [telefon, setTelefon] = useState('')
  const [postnummer, setPostnummer] = useState('')

  // Step 2 fields
  const [selectedSektorer, setSelectedSektorer] = useState<string[]>([])
  const [kompetanser, setKompetanser] = useState('')

  // Step 3 fields
  const [bio, setBio] = useState('')
  const [tilgjengeligFra, setTilgjengeligFra] = useState('')
  const [onsketTimer, setOnsketTimer] = useState('')

  function handleSektorToggle(value: string) {
    setSelectedSektorer((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    )
  }

  function nextStep() {
    setError(null)

    if (step === 1) {
      if (!email || !password || !navn || !postnummer) {
        setError('Fyll ut alle obligatoriske felt')
        return
      }
      if (password.length < 8) {
        setError('Passord må være minst 8 tegn')
        return
      }
      if (!/^\d{4}$/.test(postnummer)) {
        setError('Postnummer må være 4 siffer')
        return
      }
    }

    if (step === 2) {
      if (selectedSektorer.length === 0) {
        setError('Velg minst én sektor')
        return
      }
      if (!kompetanser.trim()) {
        setError('Legg til minst én kompetanse')
        return
      }
    }

    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  function prevStep() {
    setError(null)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      // Step 1: Create user account
      const signUpData = new FormData()
      signUpData.set('email', email)
      signUpData.set('password', password)
      signUpData.set('role', 'senior')

      const signUpResult = await signUp(signUpData)
      if (!signUpResult.success) {
        setError(signUpResult.error)
        setLoading(false)
        return
      }

      // Step 2: Create senior profile
      const profileData = new FormData()
      profileData.set('navn', navn)
      profileData.set('epost', email)
      profileData.set('telefon', telefon)
      profileData.set('postnummer', postnummer)
      profileData.set('bio', bio)
      profileData.set('kompetanser', kompetanser)
      profileData.set('tilgjengelig_fra', tilgjengeligFra)
      profileData.set('onsket_timer_per_uke', onsketTimer)
      selectedSektorer.forEach((s) => profileData.append('sektorer', s))

      const profileResult = await createSeniorProfile(profileData)
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
          <CardTitle className="text-2xl font-bold">Registrer som senior</CardTitle>
          <CardDescription>Opprett din profil og bli synlig for arbeidsgivere</CardDescription>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-16 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Steg {step} av {TOTAL_STEPS}
          </p>
        </CardHeader>

        <CardContent>
          {/* Step 1: Basic info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-post *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.no"
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
              <div className="space-y-2">
                <Label htmlFor="navn">Fullt navn *</Label>
                <Input
                  id="navn"
                  type="text"
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  placeholder="Ola Nordmann"
                  required
                  autoComplete="name"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon</Label>
                <Input
                  id="telefon"
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="12345678"
                  autoComplete="tel"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postnummer">Postnummer *</Label>
                <Input
                  id="postnummer"
                  type="text"
                  value={postnummer}
                  onChange={(e) => setPostnummer(e.target.value)}
                  placeholder="0001"
                  required
                  maxLength={4}
                  inputMode="numeric"
                  className="text-base"
                />
              </div>
            </div>
          )}

          {/* Step 2: Sectors and skills */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Sektorer du har erfaring fra *</Label>
                <p className="text-sm text-gray-500">Velg minst én sektor</p>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {SEKTORER.map((sektor) => (
                    <label
                      key={sektor.value}
                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        checked={selectedSektorer.includes(sektor.value)}
                        onCheckedChange={() => handleSektorToggle(sektor.value)}
                      />
                      <span className="text-base">{sektor.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kompetanser">Kompetanser *</Label>
                <Input
                  id="kompetanser"
                  type="text"
                  value={kompetanser}
                  onChange={(e) => setKompetanser(e.target.value)}
                  placeholder="f.eks. prosjektledelse, regnskap, undervisning"
                  className="text-base"
                />
                <p className="text-sm text-gray-500">Skill med komma mellom hver kompetanse</p>
              </div>
            </div>
          )}

          {/* Step 3: Bio and availability */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Om deg</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Fortell litt om din bakgrunn og hva du kan tilby..."
                  rows={5}
                  maxLength={2000}
                  className="text-base"
                />
                <p className="text-sm text-gray-500">{bio.length}/2000 tegn</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tilgjengelig_fra">Tilgjengelig fra</Label>
                <Input
                  id="tilgjengelig_fra"
                  type="date"
                  value={tilgjengeligFra}
                  onChange={(e) => setTilgjengeligFra(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="onsket_timer">Ønsket timer per uke</Label>
                <Input
                  id="onsket_timer"
                  type="number"
                  value={onsketTimer}
                  onChange={(e) => setOnsketTimer(e.target.value)}
                  placeholder="f.eks. 10"
                  min={1}
                  max={40}
                  inputMode="numeric"
                  className="text-base"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md mt-4" role="alert">
              {error}
            </p>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" size="lg" className="flex-1 text-base" onClick={prevStep}>
                Tilbake
              </Button>
            )}
            {step < TOTAL_STEPS ? (
              <Button type="button" size="lg" className="flex-1 text-base" onClick={nextStep}>
                Neste
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="flex-1 text-base"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Oppretter konto...' : 'Opprett konto'}
              </Button>
            )}
          </div>

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
