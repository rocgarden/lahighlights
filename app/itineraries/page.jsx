//app/itineraries/page
import ItineraryGrid from "@/app/components/ItineraryGrid";
import { getItineraries } from "@/services/itineraryService";
import ItineraryFilterClient from "../components/ItineraryFilterClient";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
// app/itineraries/page.tsx
export const metadata = {
  title: "All Itineraries | Norah Bird",
  description: "Browse all curated travel itineraries across cities and interests.",
};
export const revalidate = 3600;

export default async function AllItinerariesPage() {
    const itineraries = await getItineraries();
  return (
    <div>
    <div className=" ">
   {/* Gradient background for small screens only */}
      <div className="mt-20 bg-size-200 sm:hidden bg-gradient-to-r from-pink-900 via-indigo-500 to-rose-400 animate-gradientMove  p-4 text-white shadow-xl">
         <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Itineraries"}
          ]}
          />
        <h1 className="text-2xl font-bold mb-2 text-center">All Itineraries</h1>
        <p className="text-md">
          Discover curated LA travel plans — from food trails to creative walks. Choose your vibe, get inspired, and explore with confidence! 💯
        </p>
      </div>

      {/* Standard layout for medium and up */}
      <div className="mt-25 hidden sm:block mb-6 px-20">
        <h1 className="text-3xl text-indigo-800 font-bold">All Itineraries</h1>
        <p className="mt-2 text-gray-600 text-base max-w-3xl">
          Discover curated LA travel plans — from food trails to creative walks. Choose your vibe, get inspired, and explore with confidence.
        </p>
      </div>
    </div>  
    <section className="px-6 max-w-6xl mx-auto mt-0 py-2">

      {/* Optional: Ad placeholder */}
      {/* <div className="hidden sm:block text-right mb-4">
        <div className="w-60 h-20 bg-gray-100 border border-gray-300 rounded shadow-inner text-xs text-gray-400 flex items-center justify-center italic">
          (Ad placement here)
        </div>
      </div>       */}


      {/* <ItineraryGrid itineraries={itineraries} /> */}
      <ItineraryFilterClient itineraries={itineraries} />
         <div className="mt-8 text-sm text-black/40 text-center pt-3">
        *See{" "}
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>{" "}
        of use. 
      </div>
    </section>
    </div>
  );
}
