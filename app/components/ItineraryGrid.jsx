import ItineraryCard from "./itineraryCard";
// components/ItineraryGrid.tsx
// ItineraryGrid.tsx
export default function ItineraryGrid({ itineraries }) {
  if (!itineraries || itineraries.length === 0) {
    return <p className="text-gray-500">No itineraries found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary._id} itinerary={itinerary} />
      ))}
    </div>
  );
}

