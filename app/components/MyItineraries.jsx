//app/components/myItineraries
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function MyItineraries() {
  const { data: session, status } = useSession();
  const [itineraries, setItineraries] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/itineraries/creator/${session.user.email}`)
        .then((res) => res.json())
        .then(setItineraries)
        .catch((err) => console.error("Error loading itineraries:", err));
    }
  }, [session]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Delete this itinerary?");
    if (!confirmed) return;

    const res = await fetch(`/api/itineraries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItineraries(itineraries.filter((item) => item.id !== id));
      router.push("/");
    } else {
      console.error("Delete failed");
    }
  };

  if (status === "loading") return <p className="text-white">Loading...</p>;
  if (!session)
    return (
      <p className="text-white">Please sign in to view your itineraries.</p>
    );

  return (
    <div className="flex flex-col mx-auto bg-[#9ab581] items-center min-h-screen  text-white">
      {/* <div className="flex flex-col mx-auto bg-[#9ab581] items-center min-h-screen p-6 pt-5 text-white"> */}
      {/* <div className="flex flex-col bg-[#9ab581] items-center justify-center min-h-screen p-6"> */}

      <h1 className="text-3xl font-bold mb-6">My Itineraries</h1>
      {itineraries.length === 0 ? (
        <p>No itineraries yet.</p>
      ) : (
        <div className="space-y-6 bg-[#FFDB58] rounded-md text-indigo-900">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.slug}
              className="flex justify-between border p-3 m-3 rounded bg-[#FFDB58]"
            >
              <div className="flex flex-col   ">
                <h2 className="text-xl font-bold">
                  {itinerary.title} – {itinerary.city}
                </h2>
                <p className="text-sm text-indigo-900">
                  Duration and Type: {itinerary.duration} • {itinerary.type}
                </p>
                <div>
                <span className="text-indigo-900 ml-auto">
                  🕒 Created:{" "}
                  {new Date(itinerary.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
                </div>
              </div>
              <div className="flex  gap-4 mt-2">
                <Link
                  href={`/itineraries/${itinerary.slug}`}
                  className="text-blue-400 hover:underline"
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    {" "}
                    View
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(itinerary._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
