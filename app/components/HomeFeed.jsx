'use client'
import PostCard from "./PostCard";
import Link from "next/link";
import { getCategoryEmoji } from "@/lib/utils/categoryIcons";
import FadeInSection from "./FadeInSection";
import { useState, useEffect } from "react";
import ItinerarySection from "../itineraries/ItinerarySection";
import Featured from "./Featured";

// Group posts by category
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category || 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
export default function HomeFeed() {
const [groupedPosts, setGroupedPosts] = useState({});
const [topCategories, setTopCategories] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/items");
      const items = await res.json();

      // Filter by section
      const feedItems = items.filter((item) => item.section === "feed");

      // Group by category
      const grouped = groupByCategory(feedItems);

      // Sort categories by number of posts, take top 5
      const sortedTop5 = Object.entries(grouped)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 5);

      setTopCategories(sortedTop5);
    } catch (error) {
      console.error("Error fetching feed items:", error);
    }
  };

  fetchData();
}, []);


  return (
    <div>
      <section className=" px-6 py-12 w-full space-y-16 max-w-7xl mx-auto ">
        {/* <section className="p-8 sm:p-20 pb-20 row-start-2 flex flex-col gap-16 items-center sm:items-start"> */}
        <FadeInSection>
          <h1 className="text-4xl font-bold mb-10 text-indigo-950">
             🔥 Hot Spots and Must See Favorites
          </h1>
        </FadeInSection>
        {topCategories.map(([category, posts], index) => {
          const emoji = getCategoryEmoji(category) || getCategoryEmoji.default;
          return (
            <FadeInSection key={category} delay={index * 0.1}>
              <div key={category}>
                <Link
                  href={`/category/${category
                    .toLowerCase()
                    .replace(/[^a-z]/gi, "")}`}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-400 hover:underline capitalize ">
                    {emoji} {category}
                  </h2>
                </Link>

                <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:pb-2 sm:scrollbar-thin sm:scrollbar-thumb-white/20">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="w-full sm:w-[300px] flex-shrink-0"
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          );
        })}
        ;
        <ItinerarySection />
        {/* <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"></div> */}
        {/* <FadeInSection> */}
        {/* <h2 className="flex w-full text-3xl md:text-4xl font-bold mb-6 text-indigo-950">
          ⭐ Featured Place
        </h2>
        <Link
          href="/Featured"
          className="block text-lg text-indigo-950 mt-5 underline"
        >
          See all featured →
        </Link> */}
        {/* </FadeInSection> */}
        {/* 
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="flex-shrink-0 w-[280px] md:w-[300px] lg:w-[320px]"
          >
            <PostCard key={post.id} post={post} />
          </div>
        ))}
      </div> */}
      </section>
    </div>
  );
}
