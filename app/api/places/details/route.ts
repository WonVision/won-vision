// Won Vision: Place Details proxy (Places API New v1)
// GET /api/places/details?place_id=… — public.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get('place_id')?.trim();
  if (!placeId) {
    return NextResponse.json({ error: 'place_id required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Maps not configured' }, { status: 503 });
  }

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,formattedAddress,location',
      },
    }
  );

  if (!res.ok) {
    let detail = '';
    try {
      const j = await res.json();
      detail = j?.error?.message || JSON.stringify(j);
    } catch {
      detail = await res.text();
    }
    return NextResponse.json(
      { error: `Google Places (New): ${detail || `HTTP ${res.status}`}` },
      { status: 502 }
    );
  }

  const data = (await res.json()) as {
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
  };

  if (!data.formattedAddress || data.location?.latitude == null || data.location?.longitude == null) {
    return NextResponse.json({ error: 'Place details missing address/location' }, { status: 404 });
  }

  return NextResponse.json({
    formatted_address: data.formattedAddress,
    lat: data.location.latitude,
    lng: data.location.longitude,
  });
}
