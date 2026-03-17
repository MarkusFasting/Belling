import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(q)}&treffPerSide=10`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [], error: "Kartverket API feilet" }, { status: 502 });
    }

    const data = await res.json();

    interface KartverketAdresse {
      adressetekst: string;
      postnummer: string;
      poststed: string;
      kommunenavn: string;
      kommunenummer: string;
      gardsnummer: number;
      bruksnummer: number;
      representasjonspunkt?: { lat: number; lon: number };
    }

    const results = (data.adresser as KartverketAdresse[] || []).map((a) => ({
      address: `${a.adressetekst}, ${a.postnummer} ${a.poststed}`,
      municipality: a.kommunenavn,
      municipalityNumber: a.kommunenummer,
      gnr: a.gardsnummer,
      bnr: a.bruksnummer,
      coordinates: {
        lat: a.representasjonspunkt?.lat ?? 0,
        lng: a.representasjonspunkt?.lon ?? 0,
      },
      slug: `${a.kommunenummer}-${a.gardsnummer}-${a.bruksnummer}`,
    }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [], error: "Nettverksfeil" }, { status: 500 });
  }
}
