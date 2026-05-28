import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  try {
    // Using Photon (OpenStreetMap based) for better search/autocomplete
    let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=8`;
    
    // Add location bias if available
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Photon API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Format response for the frontend
    const predictions = data.features.map((feature: any) => {
      const p = feature.properties;
      const parts = [
        p.name || p.street,
        p.city || p.town || p.village,
        p.state,
        p.postcode,
        p.country
      ].filter(Boolean);
      
      return {
        place_id: feature.properties.osm_id,
        description: parts.join(', '),
        properties: p
      };
    });

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Failed to fetch from Photon API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
