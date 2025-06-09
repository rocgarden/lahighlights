import Hero from "./components/Hero";
import HomeFeed from "./components/HomeFeed";
import Footer from "./components/Footer";
import ItinerarySection from "./itineraries/ItinerarySection";
import Featured from "./components/Featured";
import Link from "next/link";
import Head from "next/head";
import { getAllItems } from "@/services/itemService";
export const metadata = {
  title:
    "⭐ Los Angeles: Explore Top Travel Picks and Hidden Gems | Norah Bird",
  description:
    "Discover handpicked featured destinations with detailed insights and local highlights. Explore our curated travel itineraries today!",
  keywords: [
    "featured travel",
    "curated itineraries",
    "top destinations",
    "Norah Bird",
    "travel recommendations",
    "community travel picks",
  ],
  openGraph: {
    title: "Los Angeles Highlights | NorahBird",
    description:
      "Explore creative posts from our community, organized by category.",
    url: "https://norahbird.com",
    siteName: "Norah Bird",
    images: [
      {
        url: "/NorahLogoGroup.svg", // optional default hero/banner image
        width: 1200,
        height: 630,
        alt: "NorahBird",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Los Angeles Highlights | Norah Bird",
    description: "Explore creative posts from our community.",
    creator: "Norah Bird",
    site: "NorahBird",
    images: ["/NorahLogoGroup.svg"],
  },
  alternates: {
    canonical: "https://norahbird.com",
  },
};


// ISR: Revalidate once per day (86400 seconds)
export const revalidate = 86400;

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category || "Uncategorized";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export default async function Home() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "LA Highlights",
      url: "https://lahighlights.vercel.app/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://lahighlights.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

  const items = await getAllItems();
  console.log("📍 Home loaded");
  const feedItems = items.filter((item) => item.section === "feed");
  const heroItems = items.filter((item) => item.section === "hero");
  const featuredItem = items.filter((item) => item.section === "featured");
  console.log("feedItems:: ", feedItems);
  const grouped = groupByCategory(feedItems);
  const sortedTop5 = Object.entries(grouped)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* Hero Section with Static Fallback for SEO / no-JS  */}
      <div className="row-start-1 w-full relative">
        {/* Fallback only shown on small */}
        <section className="block sm:hidden aspect-[4/3] max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroItems[0]?.imageUrl}
            alt={heroItems[0]?.title || "Los Angeles Hot Spot Image"}
            className="object-cover w-full h-full rounded-lg"
            width={1200}
            height={600}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t  from-black/80 to-transparent text-white p-4">
            <h3 className="text-xl font-semibold mb-1">
              Los Angeles Attractions for Tourists and Natives
            </h3>
            <p className="text-sm">
              Whether you’re just vibing in LA for the weekend or repping it as
              a local, 👀 These spots? Non-negotiable. 📍Add to your bucket list
              nowww.
            </p>
          </div>
        </section>

        {/* JS carousel version (hidden on small screens) */}
        <div className="hidden sm:block">
          <Hero slides={heroItems} />
        </div>
      </div>

      {/* Main Content Section */}
      <main className="row-start-2">
        <section className="w-full px-6 pt-10 text-center ">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">
            <Link
              href="/itineraries"
              className="text-indigo-800 underline font-semibold"
            >
              ✨ Explore Curated LA Itineraries
            </Link>{" "}
          </h2>
          <p className="lg:block hidden mt-2 text-lg text-gray-600">
            From food crawls to mural missions — plan your next LA moment.
          </p>
          {/* <p className="mt-3">
            <Link
              href="/itineraries"
              className="text-indigo-800 underline font-semibold"
            >
              ✨ Explore Curated LA Itineraries
            </Link>
          </p> */}
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 xl:px-24 py-12 flex flex-col gap-16 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <HomeFeed topCategories={sortedTop5} />
            {/* Add more components here if needed */}
          </div>
        </div>
      </main>

      {/* Featured Section */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 xl:px-24 mt-[-4rem] mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            💫 <span className="text-gradient-animated">Snap Spots</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your feed’s next favorite background. From city murals to sunset
            views — these spots were made to go viral. Discover destinations
            chosen for their uniqueness, cultural value, and traveler buzz.
            Updated regularly.
          </p>
          {/* <Link
            href="/Featured"
            className="block text-lg text-indigo-950 mt-5 underline"
          >
            See all →
          </Link> */}
          <Featured featuredItem={featuredItem} />
        </div>
      </section>
    </div>
  );
}
