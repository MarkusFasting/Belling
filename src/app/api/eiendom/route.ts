import { NextRequest, NextResponse } from "next/server";
import { buildPropertyReport } from "@/lib/buildPropertyReport";

export async function GET(request: NextRequest) {
  const kommune = request.nextUrl.searchParams.get("kommune");
  const gnrStr = request.nextUrl.searchParams.get("gnr");
  const bnrStr = request.nextUrl.searchParams.get("bnr");

  if (!kommune || !gnrStr || !bnrStr) {
    return NextResponse.json({ error: "Mangler påkrevde parametere: kommune, gnr, bnr" }, { status: 400 });
  }

  const gnr = parseInt(gnrStr, 10);
  const bnr = parseInt(bnrStr, 10);

  if (isNaN(gnr) || isNaN(bnr)) {
    return NextResponse.json({ error: "gnr og bnr må være tall" }, { status: 400 });
  }

  try {
    const report = await buildPropertyReport(kommune, gnr, bnr);
    return NextResponse.json(report);
  } catch {
    return NextResponse.json({ error: "Kunne ikke hente eiendomsdata" }, { status: 500 });
  }
}
