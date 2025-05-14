"use client";

import { useEffect, useState } from "react";
import FeaturedGrid from "./FeaturedGrid";
import Link from "next/link";
export default function FeaturedSection() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/items");
        const items = await res.json();
        console.log("featured items:: ",items)
        const featured = items
          .filter((item) => item.section === "featured")
          .map((item) => ({
            id: item._id,
            image: item.imageUrl,
            title: item.title,
            subtitle: item.content,
            city: item.city,
            date: item.createdAt,
            link: `/post/${item._id}`,
            addressLink: item.addressLink
          }));

        setFeaturedItems(featured);
      } catch (err) {
        console.error("Failed to fetch featured items:", err);
      }
    };

    fetchData();
  }, []);

  if (!featuredItems.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-950">
        💫 Snap Spots
      </h2>
      <p className="text-lg text-gray-600 mb-6 max-w-prose">
        Aesthetic overload ahead. Snap responsibly. Post at your own risk. 😎📷
      </p>
      <FeaturedGrid featuredItems={featuredItems} />
      <div className="mt-36 text-sm text-black/60 border-t border-black/20 pt-6">
        ⚠️ <strong>Disclaimer:</strong> This post is for inspiration only.
        Always check ahead for availability, allergens, accessibility, and other
        personal needs. Use at your own risk. See{" "}
        <Link href="/terms">Terms.</Link>
      </div>{" "}
    </section>
  );
}
