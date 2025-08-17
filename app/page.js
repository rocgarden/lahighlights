import Hero from "./components/Hero";
import HomeFeed from "./components/HomeFeed";
import Footer from "./components/Footer";
import ItinerarySection from "./itineraries/ItinerarySection";
import Featured from "./components/Featured";
import Link from "next/link";
import Head from "next/head";
import { getAllItems } from "@/services/itemService";
import CoffeeIcon from "./components/icons/CoffeeIcon";
import CameraIcon from "./components/icons/CameraIcon";
import TheaterIcon from "./components/icons/TheaterIcon";
import SurfIcon from "./components/icons/SurfIcon";
import MoviesIcon from "./components/icons/MoviesIcon";
import { BackgroundIcons } from "./components/BackgroundIcons";
import { BackgroundScatterIcons } from "./components/BackgroundScatterIcons";
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
    title: "NorahBird | Los Angeles Highlights",
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
    title: "Norah Bird | Los Angeles Highlights",
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
      name: "Norah Bird | LA Highlights",
      url: "https://norahbird.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://norahbird.com/search?q={search_term_string}",
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* Hero Section with Static Fallback for SEO / no-JS  */}
      <div className="row-start-1 w-full relative">
        {/* Fallback only shown on small */}
        <section className="block sm:hidden aspect-[4/3] max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroItems[1]?.imageUrl}
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
     <section className="relative w-full px-6 py-16 text-center bg-red-200 overflow-hidden">
     <BackgroundScatterIcons/>
  {/* Header + tagline */}
  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950 relative z-10">
    <Link
      href="/itineraries"
      className="text-indigo-800 font-semibold"
    >
      ✨ Explore Curated LA Itineraries
    </Link>
  </h2>
  <p className="lg:block hidden mt-2 text-lg text-gray-600 relative z-10">
    From food crawls to mural missions — plan your next LA moment.
  </p>
  {/* Floating background icons */}
  {/* <CoffeeIcon className="absolute top-4 left-8 w-8 h-8 text-orange-300/30 animate-[sway_6s_ease-in-out_infinite]" />
  <TheaterIcon className="absolute top-12 right-12 w-10 h-10 text-red-300/30 animate-[wiggle_5s_ease-in-out_infinite]" />
  <CameraIcon className="absolute bottom-6 left-1/4 w-8 h-8 text-gray-400/30 animate-[sway_8s_ease-in-out_infinite]" />
  <SurfIcon className="absolute bottom-10 right-1/8 w-12 h-12 text-blue-300/30 animate-[wiggle_7s_ease-in-out_infinite]" />
  <MoviesIcon className="absolute top-1/2 left-20 w-9 h-9 text-indigo-300/20 animate-[sway_10s_ease-in-out_infinite]" /> */}
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
