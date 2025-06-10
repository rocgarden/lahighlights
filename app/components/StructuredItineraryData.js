// app/components/StructuredItineraryData.js
"use client";

import Head from "next/head";

export default function StructuredItineraryData({ itinerary }) {
  if (!itinerary) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: itinerary.title,
    description: itinerary.description,
    itinerary: itinerary.highlights.map((highlight, index) => ({
      "@type": "TouristAttraction",
      name: highlight.place || highlight.activity,
      description: highlight.activity,
      position: index + 1,
    })),
    touristType: itinerary.type, // e.g. 'family', 'solo'
    image: itinerary.fileUrl || "https://lahighlights.vercel.app/default.jpg",
    offers: {
      "@type": "Offer",
      price: itinerary.price || "0", // If free
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://lahighlights.vercel.app/itineraries/${itinerary.slug}`,
    },
    provider: {
      "@type": "Organization",
      name: "LA Highlights",
      url: "https://lahighlights.vercel.app",
    },
    areaServed: {
      "@type": "Place",
      name: itinerary.city,
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
