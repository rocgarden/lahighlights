import PostCard from "./PostCard";
import Link from "next/link";
import { getCategoryEmoji } from "@/lib/utils/categoryIcons";
import { getCategoryTagline } from "@/lib/utils/categoryDescriptions";
import FadeInSection from "./FadeInSection";
import ItinerarySection from "../itineraries/ItinerarySection";
import Featured from "./Featured";
import CategoryPillsMobile from "./CategoryPillsMobile";

// Group posts by category
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category || 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
export default function HomeFeed({ topCategories }) {
  //const [groupedPosts, setGroupedPosts] = useState({});
//const [topCategories, setTopCategories] = useState([]);

  // useEffect(() => {
  //   // Filter by section
  //   const feedItems = items.filter((item) => item.section === "feed");

  //   // Group by category
  //   const grouped = groupByCategory(feedItems);

  //   // Sort categories by number of posts, take top 5
  //   const sortedTop5 = Object.entries(grouped)
  //     .sort((a, b) => b[1].length - a[1].length)
  //     .slice(0, 5);

  //   setTopCategories(sortedTop5);
  // }, [items]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await fetch("/api/items");
//       const items = await res.json();

//       // Filter by section
//       const feedItems = items.filter((item) => item.section === "feed");

//       // Group by category
//       const grouped = groupByCategory(feedItems);

//       // Sort categories by number of posts, take top 5
//       const sortedTop5 = Object.entries(grouped)
//         .sort((a, b) => b[1].length - a[1].length)
//         .slice(0, 5);

//       setTopCategories(sortedTop5);
//     } catch (error) {
//       console.error("Error fetching feed items:", error);
//     }
//   };

//   fetchData();
// }, []);


  return (
    <div>
     <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
  <FadeInSection>
    <h1 className="text-3xl sm:text-4xl font-bold text-indigo-950 text-center">
      🕶️ <span className="text-gradient-animated">Drop-In Destinations</span>
    </h1>
    <p className="text-lg text-gray-600 mt-2 text-center sm:text-left">
      Discover curated, camera-ready spots made for memories — from local
      gems to highlight reel stars. Los Angeles has lots to explore!
    </p>
    <CategoryPillsMobile />
  </FadeInSection>
  
  {topCategories.map(([category, posts], index) => {
    const emoji = getCategoryEmoji(category) || getCategoryEmoji.default;
    return (
      <FadeInSection key={category} delay={index * 0.1}>
        <div>
          <Link
            href={`/category/${category.toLowerCase().replace(/[^a-z]/gi, "")}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-400 hover:underline text-center sm:text-left capitalize">
              {emoji} {category}
            </h2>
            <p className="hidden sm:block sm:text-xl text-base text-gray-500 mb-4 sm:text-left">
              {getCategoryTagline(category, "full")}
            </p>
            <p className="sm:hidden text-xl text-gray-500 mb-4 font-bold text-center">
              {getCategoryTagline(category, "short")}
            </p>
          </Link>

          {/* ✅ Fix horizontal scroll cut-off */}
          {/* ✅ Show only 3 on mobile, 5 on desktop */}
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            {posts.slice(0, 5).map((post, i) => (
              <div
                key={post._id}
                className={`w-full sm:w-[280px] md:w-[300px] lg:w-[320px] flex-shrink-0 ${
                  i >= 3 ? "hidden sm:block" : "" // only 3 on mobile, 5 on desktop
                }`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
            <Link
            href={`/category/${category.toLowerCase().replace(/[^a-z]/gi, "")}`}
          >
          <span className="text-sm text-black/30 leading-snug pt-6"> See more {category.toLowerCase().replace(/[^a-z]/gi, "")}</span>
          </Link>
        </div>
      </FadeInSection>
    );
  })}
  
  <ItinerarySection />
</section>

    </div>
  );
}
