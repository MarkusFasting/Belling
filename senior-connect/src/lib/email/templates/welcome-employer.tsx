interface WelcomeEmployerProps {
  kontaktperson: string
  firmanavn: string
}

export function welcomeEmployerTemplate({ kontaktperson, firmanavn }: WelcomeEmployerProps): string {
  return `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Velkommen til Senior Connect</title>
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
        <h2 style="color: #1e40af; margin: 0 0 20px;">Velkommen, ${kontaktperson}!</h2>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          ${firmanavn} er nå registrert på Senior Connect. Vi gleder oss til å hjelpe dere
          med å finne erfarne fagfolk!
        </p>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 15px;">
          Med Senior Connect får dere tilgang til et nettverk av erfarne seniorer som
          ønsker å bidra med sin kompetanse.
        </p>
        <p style="color: #333333; line-height: 1.6; margin: 0 0 25px;">
          For å komme i gang:
        </p>
        <ul style="color: #333333; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
          <li>Søk etter seniorer innen din bransje</li>
          <li>Se anonymiserte profiler gratis</li>
          <li>Oppgrader til Pro for å ta direkte kontakt</li>
        </ul>
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background-color: #1e40af; border-radius: 6px; padding: 12px 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
                 style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                Start søket
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
