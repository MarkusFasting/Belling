interface MatchAcceptedProps {
  kontaktperson: string
  seniorNavn: string
  seniorEpost: string
  seniorTelefon?: string | null
}

export function matchAcceptedTemplate({ kontaktperson, seniorNavn, seniorEpost, seniorTelefon }: MatchAcceptedProps): string {
  return `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kontaktforespørsel akseptert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; text-align: center; background-color: #1e40af;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Senior Connect</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #16a34a; margin: 0 0 20px;">Forespørselen ble akseptert!</h2>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          Hei ${kontaktperson},
        </p>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          Gode nyheter! <strong>${seniorNavn}</strong> har akseptert din kontaktforespørsel.
        </p>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 0 0 25px;">
          <h3 style="color: #16a34a; margin: 0 0 10px; font-size: 16px;">Kontaktinformasjon</h3>
          <p style="color: #333333; line-height: 1.6; margin: 0 0 5px;">
            <strong>Navn:</strong> ${seniorNavn}
          </p>
          <p style="color: #333333; line-height: 1.6; margin: 0 0 5px;">
            <strong>E-post:</strong> <a href="mailto:${seniorEpost}" style="color: #1e40af;">${seniorEpost}</a>
          </p>
          ${seniorTelefon ? `
          <p style="color: #333333; line-height: 1.6; margin: 0;">
            <strong>Telefon:</strong> <a href="tel:${seniorTelefon}" style="color: #1e40af;">${seniorTelefon}</a>
          </p>
          ` : ''}
        </div>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 25px;">
          Vi anbefaler å ta kontakt så snart som mulig. Lykke til!
        </p>
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background-color: #1e40af; border-radius: 6px; padding: 12px 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/matches"
                 style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                Se alle kontakter
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 30px; text-align: center; background-color: #f5f5f5; color: #666666; font-size: 12px;">
        <p style="margin: 0;">Senior Connect - Erfaring møter mulighet</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
