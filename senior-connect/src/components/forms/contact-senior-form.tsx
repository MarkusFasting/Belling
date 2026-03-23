'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createMatch } from '@/actions/match'

interface ContactSeniorFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  seniorId: string | null
  seniorNavn: string | null
}

const MAX_MESSAGE_LENGTH = 500

export function ContactSeniorForm({
  open,
  onOpenChange,
  seniorId,
  seniorNavn,
}: ContactSeniorFormProps) {
  const [melding, setMelding] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const charCount = melding.length

  const handleSubmit = () => {
    if (!seniorId) return
    setError(null)

    const formData = new FormData()
    formData.set('senior_id', seniorId)
    formData.set('melding', melding)

    startTransition(async () => {
      const result = await createMatch(formData)
      if (result.success) {
        setSuccess(true)
        setMelding('')
        setTimeout(() => {
          setSuccess(false)
          onOpenChange(false)
        }, 2000)
      } else {
        setError(result.error)
      }
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMelding('')
      setError(null)
      setSuccess(false)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Kontakt {seniorNavn ?? 'denne senioren'}
          </DialogTitle>
          <DialogDescription>
            Skriv en kort melding om hva du ser etter. Senioren vil motta en
            e-post med din henvendelse.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center">
            <p className="text-lg font-medium text-green-700">
              Henvendelsen er sendt!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Du vil bli varslet nar senioren svarer.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div>
                <Label htmlFor="contact-message" className="text-base">
                  Melding
                </Label>
                <Textarea
                  id="contact-message"
                  value={melding}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                      setMelding(e.target.value)
                    }
                  }}
                  placeholder="Beskriv kort hva slags arbeid du tilbyr og hva du ser etter..."
                  rows={5}
                  className="mt-1 text-base"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    Minimum 10 tegn
                  </span>
                  <span
                    className={`text-xs ${
                      charCount > MAX_MESSAGE_LENGTH * 0.9
                        ? 'text-orange-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {charCount}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Avbryt
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending || charCount < 10}
              >
                {isPending ? 'Sender...' : 'Send henvendelse'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
