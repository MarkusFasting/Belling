interface NewMatchProps {
  seniorNavn: string
  firmanavn: string
  melding?: string | null
}

export function newMatchTemplate({ seniorNavn, firmanavn, melding }: NewMatchProps): string {
  return `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny kontaktforespørsel</title>
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
        <h2 style="color: #1e40af; margin: 0 0 20px;">Ny kontaktforespørsel!</h2>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          Hei ${seniorNavn},
        </p>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          <strong>${firmanavn}</strong> ønsker å komme i kontakt med deg gjennom Senior Connect.
        </p>
        ${melding ? `
        <div style="background-color: #f0f4ff; border-left: 4px solid #1e40af; padding: 15px 20px; margin: 0 0 25px;">
          <p style="color: #333333; line-height: 1.6; margin: 0; font-style: italic;">"${melding}"</p>
        </div>
        ` : ''}
        <p style="color: #333333; line-height: 1.6; margin: 0 0 25px;">
          Logg inn for å se forespørselen og svare.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background-color: #1e40af; border-radius: 6px; padding: 12px 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/matches"
                 style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                Se forespørselen
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
