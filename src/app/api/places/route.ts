import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  try {
    // Using Nominatim (OpenStreetMap) as a free alternative
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'MemoryBloom-Saas/1.0', // Nominatim requires a User-Agent
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Format the Nominatim response to match the Google Maps predictions format 
    // that the frontend currently expects
    const predictions = data.map((item: any) => ({
      place_id: item.place_id,
      description: item.display_name
    }));

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Failed to fetch from Free Geocoding API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
