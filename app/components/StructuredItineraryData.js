// app/components/StructuredItineraryData.js
"use client";

import Head from "next/head";

export default function StructuredItineraryData({ itinerary }) {
  if (!itinerary) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itinerary.title,
    description: itinerary.description || itinerary.type,
    image: itinerary.fileUrl || "https://norahbird.com/default.jpg",
    offers: {
      "@type": "Offer",
      price: itinerary.price || "0", // If free
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://norahbird.com/itineraries/${itinerary.slug}`,
    },
    brand: {
      "@type": "Brand",
      name: "Norah Bird",
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
