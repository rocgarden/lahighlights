import Image from "next/image";
import NewItem from "./items/new/page";
import Hero from "./components/Hero";
import HomeFeed from "./components/HomeFeed";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Link from "next/link";
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

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)]">
      {/* Full-width Hero */}
      <Hero />
      {/* Main Content Section */}
      <main className="p-8 sm:p-20 pb-20 row-start-2 flex flex-col gap-16 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* <NewItem /> */}
          <HomeFeed />
          {/* Add more components here if needed */}
        </div>
      </main>
      {/* Centered + full-width featured card */}
      {/* Full-width Featured Section */}
      <section className="w-full px-6 sm:px-10 lg:px-20 mb-8 xl:px-32 mt-[-4rem]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          💫 <span className="text-gradient-animated">Snap Spots</span> 
        </h2>
        <p className="text-lg text-gray-600 mb-6 ">
          Your feed’s next favorite background. From city murals to sunset views
          — these spots were made to go viral. Discover destinations chosen for
          their uniqueness, cultural value, and traveler buzz. Updated
          regularly.
        </p>
        <Link
          href="/Featured"
          className="block text-lg text-indigo-950 mt-5 underline"
        >
          See all →
        </Link>
        <Featured />
      </section>
    </div>
  );
}
