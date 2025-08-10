//app/itineraries/slug/page
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
import { generateItineraryMetadata } from "@/lib/utils/generateItineraryMetadata";
import redis from "@/lib/redis";
import { serializeItinerary } from "@/lib/utils/serializeItinerary";
import StructuredItineraryData from "@/app/components/StructuredItineraryData";
import Head from "next/head";
import RelatedItineraries from "@/app/components/RelatedItineraries";

export const revalidate = 120;
export async function generateMetadata(props) {
  const { slug } = await props.params;
  await connectDB();

  let itinerary;
  const cached = await redis.get(`itinerary:${slug}`);

  if (cached) {
    itinerary = JSON.parse(cached);
  } else {
    const raw = await Itinerary.findOne({ slug });
    if (!raw) return {};
    itinerary = serializeItinerary(raw);
    await redis.set(`itinerary:${slug}`, JSON.stringify(itinerary), "EX", 3600); // cache 1 hour
  }

  return generateItineraryMetadata(itinerary, slug);
}

export default async function ItineraryDetailPage(props) {
  const { slug } = await props.params;
  await connectDB();

  let itinerary;
  let raw;

  const cached = await redis.get(`itinerary:${slug}`);

  if (cached) {
    itinerary = JSON.parse(cached);
  } else {
    raw = await Itinerary.findOne({ slug });
    if (!raw) return notFound();
    itinerary = serializeItinerary(raw);
    await redis.set(`itinerary:${slug}`, JSON.stringify(itinerary), "EX", 3600); // 1 hour cache
  }
  // If no raw (because of cache), fetch it again just to get _id
  if (!raw) {
    raw = await Itinerary.findOne({ slug });
    if (!raw) return notFound();
  }

  // ✅ Fetch related itineraries using raw._id
  const relatedRaw = await Itinerary.find({
    _id: { $ne: raw._id }, // exclude current
    city: raw.city,
    type: raw.type,
  })
    .limit(3)
    .lean();

  const related = relatedRaw.map(serializeItinerary);

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
    highlights,
  } = itinerary;

  return (
    <>
      <Head>
        {" "}
        <StructuredItineraryData itinerary={itinerary} />
         <link rel="canonical" href={`https://norahbird.com/itineraries/${slug}`}/>
      </Head>
      <section className=" max-w-3xl mx-5 sm:mx-auto bg-red-400 px-4  sm:px-6 mt-16 sm:mt-24 mb-4 pt-8 sm:pt-10 pb-12 text-white rounded-lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Itineraries", href: "/itineraries" },
            { label: title }, // current page
          ]}
        />
         {/* <div className=" flex flex-wrap gap-3 mb-2 text-sm">
          <p className="text-base sm:text-lg text-white/80 ">📍 {city}</p>
          <span className="text-white/60 ml-auto">
            🕒 {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>  */}
        <div className="hidden lg:block">
        <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Itinerary: {title}
        </h1>{" "}
        <p className="text-base sm:text-lg text-white/80 mb-4">📍 {city}</p>
        <div className=" flex flex-wrap gap-3 mb-6 text-sm">
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
        </div>
{fileUrl && mediaType !== "video" && (
  <div className="-mx-4 sm:-mx-6 mb-6">
    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
      <img
        src={fileUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/90 to-black/30" />
                
      {/* Description shown only on md/large screens over image */}
       <div className="hidden sm:block absolute bottom-4 left-4 sm:left-6 text-white z-10">
          <article className="text-white/90 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {description}
          </article>
      </div>
      
      {/* Title and tags over image */}
      <div className=" lg:hidden absolute bottom-4 left-4 sm:left-6 text-white z-10 ">
         {/* <article className=" text-white/90 leading-relaxed sm:mb-4 mb-2 text-base sm:text-lg  whitespace-pre-wrap">
          {description}
        </article> */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="bg-blue-600/80 px-3 py-1 rounded-full">
            ⏳ {duration}
          </span>
          <span className="bg-green-600/80 px-3 py-1 rounded-full capitalize">
            {getItineraryTypeIcon(type)} {type}
          </span>
          <span className="text-white/80">📍 {city}</span>
         
        </div>
      </div>
    </div>
  </div>
)}

         {/* Description shown only on small screens BELOW image */}
        <article className="block sm:hidden text-white/90 leading-relaxed mb-4 text-base sm:text-lg whitespace-pre-wrap">
          <div> <span className="text-white/60  sm:inline ml-auto text-right">
          🕒 {new Date(createdAt).toLocaleDateString()}
        </span></div>{description}
        </article>
        {/* Structured Highlights */}
        <p className="text-md sm:text-lg text-center text-white font-semibold mb-6 mt-6">
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
                tip: h.tip
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
        <div className="align-center">
          <RelatedItineraries items={related} />
        </div>
        <div className="mt-10 text-sm text-white/60">
          <CreatorBadge creator="Norah Bird" />
        </div>
        <div className="mt-12 sm:mt-16 text-xs sm:text-sm text-white/60 border-t border-white/20 pt-6 leading-relaxed">
          ⚠️ <strong className="font-semibold">Disclaimer:</strong> This
          itinerary is for inspiration only. Always check ahead for
          availability, allergens, accessibility, and other personal needs. Use
          at your own risk. All trademarks and brand names are the property of
          their respective owners. Use does not imply endorsement. See{" "}
          <Link href="/terms" className="underline hover:text-white">
            Terms.
          </Link>
        </div>
      </section>
    </>
  );
}
