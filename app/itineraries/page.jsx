//app/itineraries/page
import ItineraryGrid from "@/app/components/ItineraryGrid";
import { getItineraries } from "@/services/itineraryService";
import ItineraryFilterClient from "../components/ItineraryFilterClient";
import Breadcrumb from "../components/Breadcrumb";

// app/itineraries/page.tsx
export const metadata = {
  title: "All Itineraries | Norah Bird",
  description: "Browse all curated travel itineraries across cities and interests.",
};
export const revalidate = 3600;

export default async function AllItinerariesPage() {
    const itineraries = await getItineraries();
  return (
    <section className="px-6 max-w-6xl mx-auto mt-20 py-12">
          <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Itineraries"}
              ]}
            />      <h1 className="sm:text-3xl text-2xl text-indigo-800 font-bold mb-6">All Itineraries</h1>
      {/* <ItineraryGrid itineraries={itineraries} /> */}
      <ItineraryFilterClient itineraries={itineraries}/>
    </section>
  );
}
