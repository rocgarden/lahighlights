// app/api/geocode/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    const data = await geoRes.json();

    if (data.status !== "OK" || !data.results[0]) {
      return NextResponse.json(
        { error: "No results found" },
        { status: 404 }
      );
    }

    const location = data.results[0].geometry.location;
    return NextResponse.json({
      lat: location.lat,
      lon: location.lng,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
