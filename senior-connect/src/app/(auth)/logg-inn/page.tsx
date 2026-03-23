'use client'

import { useState } from 'react'
import { login } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result && !result.success) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Logg inn</CardTitle>
          <CardDescription>Velkommen tilbake til Senior Connect</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="din@epost.no"
                required
                autoComplete="email"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passord</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                minLength={6}
                className="text-base"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full text-base" size="lg" disabled={loading}>
              {loading ? 'Logger inn...' : 'Logg inn'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Har du ikke konto?</p>
            <div className="flex gap-4 justify-center mt-2">
              <Link href="/registrer/senior" className="text-blue-600 hover:underline font-medium">
                Registrer som senior
              </Link>
              <Link href="/registrer/arbeidsgiver" className="text-blue-600 hover:underline font-medium">
                Registrer som arbeidsgiver
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
