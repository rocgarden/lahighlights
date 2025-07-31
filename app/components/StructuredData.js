"use client";
import Head from "next/head";

export default function StructuredData({ category, items }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Itineraries in ${category}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://norahbird.com/itineraries/${item.slug}`,
      name: item.title,
    })),
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
