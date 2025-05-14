"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Featured() {
  const [featuredItem, setFeaturedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/items");
        const items = await res.json();
        const featured = items.find((item) => item.section === "featured");

        if (featured) {
          setFeaturedItem({
            image: featured.imageUrl,
            title: featured.title,
            subtitle: featured.content,
            link: `/post/${featured._id}`,
            addressLink: featured.addressLink,
          });
        }
      } catch (error) {
        console.error("Failed to load featured item:", error);
      }
    };

    fetchData();
  }, []);

  if (!featuredItem) return null;

  const { image, title, subtitle, link, addressLink } = featuredItem;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full sm:aspect-[16/5]  aspect-[16/7] overflow-hidden rounded-lg shadow-lg cursor-pointer"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded-lg transition-transform duration-300"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-sm mb-3 line-clamp-3">{subtitle}</p>
        <a
          href={addressLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 rounded py-1 px-3 mt-2 text-sm transition"
        >
          View Website
        </a>
      </div>
    </motion.div>
  );
}
