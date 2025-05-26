import Image from "next/image";
import NewItem from "./items/new/page";
import Hero from "./components/Hero";
import HomeFeed from "./components/HomeFeed";
import Footer from "./components/Footer";
import ItinerarySection from "./itineraries/ItinerarySection";
import Featured from "./components/Featured";
import Link from "next/link";
import { getAllItems } from "@/services/itemService";
// export const metadata = {
//   title: "Monthly Challenges | MyApp",
//   description:
//     "Explore creative posts from our community, organized by category.",
//   openGraph: {
//     title: "Monthly Challenges | MyApp",
//     description:
//       "Explore creative posts from our community, organized by category.",
//     url: "https://yoursite.com",
//     siteName: "MyApp",
//     images: [
//       {
//         url: "/og-image.jpg", // optional default hero/banner image
//         width: 1200,
//         height: 630,
//         alt: "Monthly Challenges",
//       },
//     ],
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Monthly Challenges | MyApp",
//     description: "Explore creative posts from our community.",
//     images: ["/og-image.jpg"],
//   },
// };

async function fetchFeedItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/items`, {
    next: { revalidate:86400},
  });
  const items = await res.json();
  return items;
}

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

 const items = await getAllItems();
 console.log("📍 Home loaded");
 const feedItems = items.filter((item) => item.section === "feed");
const heroItems = items.filter((item) => item.section === "hero");
const featuredItem = items.filter((item) => item.section === "featured");

 const grouped = groupByCategory(feedItems);
 const sortedTop5 = Object.entries(grouped)
   .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      {/* Full-width Hero */}
      <Hero slides={heroItems} />

      {/* Main Content Section */}
      <main className="row-start-2">
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
