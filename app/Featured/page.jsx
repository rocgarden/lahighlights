// app/featured/page.jsx

import FeaturedSection from "../components/FeaturedSection";

export const metadata = {
  title:
    "⭐ Featured Places: Explore Top Travel Picks and Hidden Gems | Norah Bird",
  description:
    "Discover handpicked featured destinations with detailed insights and local highlights. Explore our curated travel picks today!",
  keywords: [
    "featured travel",
    "curated itineraries",
    "top destinations",
    "Norah Bird",
    "travel recommendations",
    "community travel picks",
  ],
  openGraph: {
    title: "⭐ Featured Places: Explore Top Travel Picks and Hidden Gems",
    description:
      "Explore handpicked destinations and curated travel plans from the Norah Bird community. Updated regularly with unique local experiences.",
    url: "https://norahbird.com/featured",
    siteName: "Norah Bird",
    images: [
      {
        url: "https://norahbird.com/og-featured.jpg", // 👈 Replace with actual image
        width: 1200,
        height: 630,
        alt: "Top Travel Destinations - Norah Bird",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Featured Places: Explore Top Travel Picks and Hidden Gems| Norah Bird",
    description:
      "Handpicked travel experiences shared by the community. Discover something inspiring.",
    images: ["https://norahbird.com/og-featured.jpg"], // 👈 Replace with actual image
  },
};


export default function FeaturedPage() {
  return (
    <main className=" max-w-7xl mx-auto min-h-screen px-6 py-12 mt-10 space-y-12">
      <div className="space-y-4">
        {/* <h1 className="text-4xl font-bold text-indigo-950">
          ⭐ Featured Places
        </h1> */}
        <FeaturedSection />
      </div>
    </main>
  );
}
