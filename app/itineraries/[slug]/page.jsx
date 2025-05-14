import Itinerary from "@/models/Itinerary";
import connectDB from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import Image from "next/image";
import VideoPlayer from "@/app/components/VideoPlayer"; // optional component
import { getItineraryTypeIcon } from "@/lib/utils/itineraryIcons"; // optional helper
import CreatorBadge from "@/app/components/CreatorBadge";
import Breadcrumb from "@/app/components/Breadcrumb";
import DayTimeline from "@/app/components/DayTimeline";
import Link from "next/link";

export async function generateMetadata({ params }) {
  await connectDB();
  const itinerary = await Itinerary.findOne({ slug: params.slug });
  if (!itinerary) return { title: "Itinerary Not Found" };

  return {
    title: `${itinerary.title} in ${itinerary.city} | Local Itineraries`,
    description: itinerary.description,
    highlights: itinerary.highlights,
    openGraph: {
      title: itinerary.title,
      description: itinerary.description,
      images: [
        {
          url: itinerary.fileUrl,
          width: 1200,
          height: 630,
          alt: itinerary.title,
        },
      ],
      url: `https://norahbird.com/itineraries/${params.slug}`,
    },
  };
}

export default async function ItineraryDetailPage({ params }) {
  await connectDB();

  const itinerary = await Itinerary.findOne({ slug: params.slug });
  if (!itinerary) return notFound();

  const {
    title,
    city,
    description,
    duration,
    type,
    fileUrl,
    mediaType,
    creator,
    createdAt,
    highlights
  } = itinerary;

  return (
    <section className="max-w-4xl mx-auto bg-red-400 px-6 mt-24 mb-4 pt-10 pb-12 sm:m-4text-white rounded-lg">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: title }, // current page
        ]}
      />

      <h1 className="text-4xl font-bold mb-2">Itinerary: {title}</h1>
      <p className="text-xl text-white/80 mb-4">📍 {city}</p>

      <div className="flex gap-3 mb-6 text-sm">
        <span className="bg-blue-600/80 px-3 py-1 rounded-full">
          ⏳ {duration}
        </span>
        <span className="bg-green-600/80 px-3 py-1 rounded-full capitalize">
          {getItineraryTypeIcon(type)} {type}
        </span>
        <span className="text-white/60 ml-auto">
          🕒 {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {fileUrl && (
        <div className="mb-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-lg overflow-hidden shadow-lg">
          {mediaType === "video" ? (
            <VideoPlayer src={fileUrl} />
          ) : (
            <img
              src={fileUrl}
              alt={title}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      )}

      <article className="text-white/90 leading-relaxed mb-4 text-lg whitespace-pre-wrap">
        {description}
      </article>

      {/* Structured Highlights */}
      <p className="text-lg text-white font-bold mb-4">
        📋 Your Curated Itinerary
      </p>
      {[...new Set(highlights.map((h) => h.day))]
        .sort((a, b) => a - b)
        .map((day) => {
          const filtered = highlights
            .filter((h) => h.day === day)
            .map((h) => ({
              activity: h.activity,
              place: h.place,
              timeOfDay: h.timeOfDay,
              addressLink: h.addressLink || null,
            }));

          return <DayTimeline key={day} day={day} highlights={filtered} />; // <div key={day} className="mb-4">
          // <h3 className="text-white text-xl font-semibold mb-2">
          //   🗓️ Day {day}
          // </h3>
          // <p className="text-lg text-white mb-4">
          //  What Your Day Looks Like:
          // </p>

          //   <ul className="text-white/90 text-lg space-y-2">
          //     {highlights
          //       .filter((h) => h.day === day)
          //       .map((highlight, idx) => {
          //         const phrasing = getPhrasingForActivity(highlight.activity);
          //         return (
          //           <li key={idx}>
          //             •{" "}
          //             {highlight.timeOfDay &&
          //               `${
          //                 highlight.timeOfDay[0].toUpperCase() +
          //                 highlight.timeOfDay.slice(1)
          //               }`}{" "}
          //             {phrasing} {highlight.activity} at{" "}
          //             <a
          //               href={
          //                 highlight.addressLink ||
          //                 `https://www.google.com/maps/search/${highlight.place}`
          //               }
          //               target="_blank"
          //               rel="noopener noreferrer"
          //               className="underline hover:text-blue-300"
          //             >
          //               {highlight.place}
          //             </a>
          //             {/* {highlight.place} */}
          //           </li>
          //         );
          //       })}
          //   </ul>
          // </div>
        })}

      {/* {highlights?.length > 0 && (
        <ul className="text-white text-xl mt-2 space-y-1">
          {highlights.slice(0, 3).map((highlight, idx) => {
            const phrasing = getPhrasingForActivity(highlight.activity);
            return (
              <li key={idx}>
                •{" "}
                {highlight.timeOfDay.charAt(0).toUpperCase() +
                  highlight.timeOfDay.slice(1)}{" "}
                {phrasing} {highlight.activity} {highlight.timeOfDay} at{" "}
                {highlight.place}
              </li>
            );
          })}
          {highlights.length > 3 && <li>✅...</li>}
        </ul>
      )} */}

      {/* <div className="mt-10 text-sm text-white/60">✍️  ✍️Posted by: {creator}</div> */}
      <div className="mt-10 text-sm text-white/60">
        <CreatorBadge creator="Norah Bird" />
      </div>
      <div className="mt-16 text-sm text-white/60 border-t border-white/20 pt-6">
        ⚠️ <strong>Disclaimer:</strong> This itinerary is for inspiration only.
        Always check ahead for availability, allergens, accessibility, and other
        personal needs. Use at your own risk. See <Link href="/terms">Terms.</Link>
      </div> 
    </section>
  );
}
