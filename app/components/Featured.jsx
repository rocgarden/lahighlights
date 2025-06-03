// "use client";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function Featured({ featuredItem }) {
//   // const [featuredItem, setFeaturedItem] = useState(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const res = await fetch("/api/items");
//   //       const items = await res.json();
//   //       const featured = items.find((item) => item.section === "featured");

//   //       if (featured) {
//   //         setFeaturedItem({
//   //           image: featured.imageUrl,
//   //           title: featured.title,
//   //           subtitle: featured.content,
//   //           link: `/post/${featured._id}`,
//   //           addressLink: featured.addressLink,
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to load featured item:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);
//      const sliderRef = useRef(null);

//      const [sliderRefCallback] = useKeenSlider(
//        {
//          loop: true,
//          slides: { perView: 1 },
//          autoplay: {
//            delay: 4000,
//            stopOnInteraction: false,
//          },
//        },
//        [
//          (slider) => {
//            let timeout;
//            let mouseOver = false;
//            function clearNextTimeout() {
//              clearTimeout(timeout);
//            }

//            function nextTimeout() {
//              clearTimeout(timeout);
//              if (mouseOver) return;
//              timeout = setTimeout(() => {
//                slider.next();
//              }, 4000);
//            }

//            slider.on("created", () => {
//              slider.container.addEventListener("mouseover", () => {
//                mouseOver = true;
//                clearNextTimeout();
//              });
//              slider.container.addEventListener("mouseout", () => {
//                mouseOver = false;
//                nextTimeout();
//              });
//              nextTimeout();
//            });

//            slider.on("dragStarted", clearNextTimeout);
//            slider.on("animationEnded", nextTimeout);
//            slider.on("updated", nextTimeout);
//          },
//        ]
//      );


//   if (!featuredItem || featuredItem.length === 0) return null;
//   // const { imageUrl, title, content, link, _id, slug, addressLink } =
//   //   featuredItem;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       whileHover={{ scale: 1.02 }}
//       className=" relative w-full sm:aspect-[16/5]  aspect-[16/7] overflow-hidden rounded-lg shadow-lg cursor-pointer"
//     >
//       <div ref={sliderRefCallback} className="keen-slider__slide w-full h-full ">
//         {featuredItem.map((item) => (
//           <div
//             key={item._id}
//             className="keen-slider__slide relative w-full h-full"
//           >
//             <Image
//               src={item.imageUrl}
//               alt={item.title}
//               fill
//               className="object-cover rounded-lg transition-transform duration-300"
//               priority
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
//               <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
//               <p className="text-sm mb-3 line-clamp-3">{item.content}</p>
//               <a
//                 href={item.addressLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-blue-600 hover:bg-blue-700 rounded py-1 px-3 mt-2 text-sm transition"
//               >
//                 View Details
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>

//   );

// }

"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import Image from "next/image";

export default function Featured({ featuredItem }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Autoplay logic
  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    const interval = setInterval(autoplay, 4000);
    return () => clearInterval(interval);
  }, [autoplay]);

  if (!featuredItem || featuredItem.length === 0) return null;

  return (
    <div className="overflow-hidden w-full sm:aspect-[16/5] aspect-[16/7] rounded-lg shadow-lg">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {featuredItem.map((item) => (
            <div
              key={item._id}
              className="embla__slide min-w-full relative aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-4 sm:px-6 sm:py-5">
                <div className="max-w-xl">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base mb-3 line-clamp-3">
                    {item.content}
                  </p>
                  <a
                    href={item.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 rounded py-1 px-3 mt-2 text-xs sm:text-sm transition"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
