export const SEKTORER = [
  { value: 'helse', label: 'Helse og omsorg' },
  { value: 'bygg_anlegg', label: 'Bygg og anlegg' },
  { value: 'it_teknologi', label: 'IT og teknologi' },
  { value: 'utdanning', label: 'Utdanning' },
  { value: 'offentlig_admin', label: 'Offentlig administrasjon' },
  { value: 'finans', label: 'Finans og forsikring' },
  { value: 'transport', label: 'Transport og logistikk' },
  { value: 'industri', label: 'Industri og produksjon' },
  { value: 'handel', label: 'Handel og service' },
  { value: 'annet', label: 'Annet' },
] as const

export const REGIONER = [
  { value: '0', label: 'Oslo' },
  { value: '1', label: 'Østlandet' },
  { value: '2', label: 'Innlandet' },
  { value: '3', label: 'Sør-Vestlandet' },
  { value: '4', label: 'Rogaland' },
  { value: '5', label: 'Vestlandet' },
  { value: '6', label: 'Midt-Norge' },
  { value: '7', label: 'Nord-Norge' },
  { value: '8', label: 'Nord-Norge' },
  { value: '9', label: 'Svalbard' },
] as const

export const MAX_CV_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_CV_TYPES = ['application/pdf']
export const MATCHES_PER_PAGE = 20
export const MATCH_EXPIRY_DAYS = 14
