"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInSection from "./FadeInSection";

// const slides = [
//   {
//     image:
//       "https://s3.amazonaws.com/shecodesio-production/contests/banners/000/000/062/original/Most_meaningful_song_Newsletter.png?1732790459",
//     title: "🎶 Song 1",
//     subtitle: "Create a page inspired by your favorite song.",
//     link: "/contests",
//   },
//   {
//     image:
//       "https://s3.amazonaws.com/shecodesio-production/contests/banners/000/000/062/original/Most_meaningful_song_Newsletter.png?1732790459",
//     title: "❌Song 2",
//     subtitle: "Create a page inspired by your favorite song.",
//     link: "/contests",
//   },
//   {
//     image:
//       "https://s3.amazonaws.com/shecodesio-production/stories/pictures/000/000/337/original/Untitled_%281%29.png?1723131115",
//     title: "☁️ Song 3",
//     subtitle: "Create a page inspired by your favorite song.",
//     link: "/contests",
//   },
// ];

export default function CarouselWithText({ slides}) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  //const [slides, setSlides] = useState([]);
  
//  useEffect(() => {
//    const fetchData = async () => {
//      try {
//        const res = await fetch("/api/items");
//        const items = await res.json();
//        const heroItems = items
//          .filter((item) => item.section === "hero")
//          .map((item) => ({
//            image: item.imageUrl,
//            title: item.title,
//            subtitle: item.content,
//            link: `/post/${item._id}`,
//          }));

//        setSlides(heroItems);
//      } catch (error) {
//        console.error("Failed to load hero items:", error);
//      }
//    };

//    fetchData();
//  }, []);
   useEffect(() => {
     if (slides.length === 0) return;
     const interval = setInterval(() => {
       setVisible(false);
       setTimeout(() => {
         setCurrent((prev) => (prev + 1) % slides.length);
         setVisible(true);
       }, 600);
     }, 4000);
     return () => clearInterval(interval);
   }, [slides]);

   if (slides.length === 0) return null;

  //auto-advance sides
  // useEffect(() => {
  //     if (slides.length === 0) return;
      
  //   const interval = setInterval(() => {
  //     setVisible(false); // start exit animation

  //     setTimeout(() => {
  //       setCurrent((prev) => (prev + 1) % slides.length);
  //       setVisible(true); // start enter animation
  //     }, 600); // Change slide every 5 seconds
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [slides]);
    
  //   if (slides.length === 0) return null;

  const { imageUrl, title, content, link } = slides[current];

  return (
    //added aspect ratio
    //<div className="relative w-full aspect-[4/3] max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
      <section
      aria-label="Snap Spots Carousel"
      role="region"
      aria-roledescription="carousel"
      className="relative w-full max-w-6xl aspect-[4/3] mx-auto overflow-hidden rounded-lg shadow-lg"
         >
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4 md:p-6">  
        {
          <FadeInSection
            delay={0.1}
            y={20}
            animateKey={current}
            once={false}
            trigger="always"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1">{title}</h3>
            <p className="text-sm sm:text-base max-w-prose mb-2">{content}</p>
             {/* {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View more about ${title}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded py-1.5 px-4 mt-2 text-sm sm:text-base transition"
            >
              View Details
            </a>
             )} */}
          </FadeInSection>
        }
        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2" aria-hidden="true">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-400 ${
                current === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
