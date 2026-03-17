import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://api.einnsyn.no/api/search?q=${encodeURIComponent(q)}&limit=10`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();

    interface EinnsynHit {
      title?: string;
      description?: string;
      publisher?: { name?: string };
      date?: string;
      url?: string;
    }

    const results = (data.hits as EinnsynHit[] || []).map((hit) => ({
      title: hit.title || "Uten tittel",
      description: hit.description || undefined,
      publisher: hit.publisher?.name || undefined,
      date: hit.date || undefined,
      url: hit.url || undefined,
    }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
