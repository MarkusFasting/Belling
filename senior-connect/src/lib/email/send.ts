import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Senior Connect <noreply@seniorconnect.no>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false as const, error: error.message }
    }

    return { success: true as const, data }
  } catch (error) {
    console.error('Email send exception:', error)
    return { success: false as const, error: 'Kunne ikke sende e-post' }
  }
}
