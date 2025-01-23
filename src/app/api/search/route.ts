import { NextResponse } from 'next/server';
import groq from 'groq';
import { client } from '@/sanity/lib/client';

// API route handler
export async function GET(request: Request) {
  // Query parameters ko extract karein
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || ''; // Default query empty hoga agar koi input nahi diya

  const productsQuery = groq`
    *[_type == "products" && name match $query] {
      _id,
      name,
      price,
      description,
      "imageUrl": image.asset->url,
      category
    }
  `;

  try {
    // Sanity se data fetch karein
    const products  = await client.fetch(productsQuery, { query: `${query}*` });
    return NextResponse.json(products); // JSON response return karein
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Sanity' },
      { status: 500 }
    );
  }
}
