"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInSection from "./FadeInSection";

const slides = [
  {
    image:
      "https://s3.amazonaws.com/shecodesio-production/contests/banners/000/000/062/original/Most_meaningful_song_Newsletter.png?1732790459",
    title: "🎶 Song 1",
    subtitle: "Create a page inspired by your favorite song.",
    link: "/contests",
  },
  {
    image:
      "https://s3.amazonaws.com/shecodesio-production/contests/banners/000/000/062/original/Most_meaningful_song_Newsletter.png?1732790459",
    title: "❌Song 2",
    subtitle: "Create a page inspired by your favorite song.",
    link: "/contests",
  },
  {
    image:
      "https://s3.amazonaws.com/shecodesio-production/stories/pictures/000/000/337/original/Untitled_%281%29.png?1723131115",
    title: "☁️ Song 3",
    subtitle: "Create a page inspired by your favorite song.",
    link: "/contests",
  },
];

export default function CarouselWithText() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [slides, setSlides] = useState([]);
  
 useEffect(() => {
   const fetchData = async () => {
     try {
       const res = await fetch("/api/items");
       const items = await res.json();
       const heroItems = items
         .filter((item) => item.section === "hero")
         .map((item) => ({
           image: item.imageUrl,
           title: item.title,
           subtitle: item.content,
           link: `/post/${item._id}`,
         }));

       setSlides(heroItems);
     } catch (error) {
       console.error("Failed to load hero items:", error);
     }
   };

   fetchData();
 }, []);

  //auto-advance sides
  useEffect(() => {
      if (slides.length === 0) return;
      
    const interval = setInterval(() => {
      setVisible(false); // start exit animation

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setVisible(true); // start enter animation
      }, 600); // Change slide every 5 seconds
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);
    
    if (slides.length === 0) return null;

  const { image, title, subtitle, link } = slides[current];

  return (
    //added aspect ratio
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        //width={800}
        //height={600}
        className="object-cover rounded-lg"
        // className="w-full h-auto object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
        {
          <FadeInSection
            delay={0.1}
            y={20}
            animateKey={current}
            once={false}
            trigger="always"
          >
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm mb-2">{subtitle}</p>
            <a
              href={link}
              className="inline-block bg-blue-600 hover:bg-blue-700 transition text-sm py-1 px-3 rounded"
            >
              Read more
            </a>
          </FadeInSection>
        }
        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2">
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
    </div>
  );
}
