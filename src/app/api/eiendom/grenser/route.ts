import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const kommune = request.nextUrl.searchParams.get("kommune");
  const gnrStr = request.nextUrl.searchParams.get("gnr");
  const bnrStr = request.nextUrl.searchParams.get("bnr");

  if (!kommune || !gnrStr || !bnrStr) {
    return NextResponse.json({ error: "Mangler parametere" }, { status: 400 });
  }

  const gnr = parseInt(gnrStr, 10);
  const bnr = parseInt(bnrStr, 10);

  try {
    const wfsUrl = new URL("https://wfs.geonorge.no/skwms1/wfs.matrikkelen-eiendomskart-teig");
    wfsUrl.searchParams.set("service", "WFS");
    wfsUrl.searchParams.set("version", "2.0.0");
    wfsUrl.searchParams.set("request", "GetFeature");
    wfsUrl.searchParams.set("typeNames", "matrikkelen_teig");
    wfsUrl.searchParams.set("outputFormat", "application/json");
    wfsUrl.searchParams.set("CQL_FILTER", `kommunenummer='${kommune}' AND gardsnummer=${gnr} AND bruksnummer=${bnr}`);
    wfsUrl.searchParams.set("count", "10");

    const res = await fetch(wfsUrl.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({ type: "FeatureCollection", features: [] });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ type: "FeatureCollection", features: [] });
  }
}
