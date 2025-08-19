//app/itineraries/itinerarySection.jsx
import ItineraryCard from "../components/itineraryCard";
import FadeInSection from "../components/FadeInSection";
import { getItineraries } from "@/services/itineraryService";
export const revalidate = 60;

export default async function ItinerarySection() {
  //const [itineraries, setItineraries] = useState([]);
  const itineraries = await getItineraries();


  // useEffect(() => {
  //   const fetchItineraries = async () => {
  //     try {
  //       const res = await fetch("/api/itineraries");
  //       const data = await res.json();
  //       setItineraries(data);
  //     } catch (error) {
  //       console.error("Error fetching itineraries:", error);
  //     }
  //   };

  //   fetchItineraries();
  // }, []);

  if (!itineraries?.length) return null;

  return (
    <FadeInSection>
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-6 ">
        🗺️ <span className="text-gradient-animated">Local Itineraries</span>
      </h2>
      <p className="text-indigo-800 text-base text-center md:text-left sm:text-lg mb-6 sm:mb-8 leading-relaxed">
        ✨Bite-sized adventures to explore L.A. your way.
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:overflow-x-auto lg:scrollbar-thin lg:scrollbar-thumb-white/20 scroll-smooth touch-auto snap-x snap-mandatory">
        {itineraries.slice(0, 5).map((itinerary, index) => (
          <div
            key={itinerary._id}
              className={`
              w-full sm:w-[300px] flex-shrink-0 snap-start
              ${index >= 3 ? "hidden md:block" : ""}
            `}          >
            {" "}
            <ItineraryCard itinerary={itinerary} />
          </div>
        ))}
      </div>

       <div className="text-center mt-10">
        <a
          href="/itineraries"
          className="text-indigo-600 border rounded-full px-4 py-2  hover:text-indigo-800 font-medium"
        >
          View all itineraries →
        </a>
      </div>
    </FadeInSection>
  );
}
