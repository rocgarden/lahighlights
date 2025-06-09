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
      <section className=" px-6 py-12 w-full space-y-16 max-w-7xl mx-auto ">
        {/* <section className="p-8 sm:p-20 pb-20 row-start-2 flex flex-col gap-16 items-center sm:items-start"> */}
        <FadeInSection>
          <h1 className="sm:text-4xl text-center lg:text-left text-3xl font-bold text-indigo-950">
            🕶️<span className="text-gradient-animated">Drop-In Destinations</span>
          </h1>
          <CategoryPillsMobile />

          <p className="hidden sm:block text-lg text-gray-600 max-w-xl mt-2 text-center sm:text-left">
            Discover curated, camera-ready spots made for memories — from local
            gems to highlight reel stars.
          </p>
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
                  <h2 className="text-center sm:text-left text-3xl md:text-4xl font-bold mb-3 text-red-400 hover:underline capitalize ">
                    {emoji} {category}
                  </h2>
                  <p className="text-base text-gray-500 mb-4 hidden sm:text-xl sm:block sm:text-left">
                    {getCategoryTagline(category, "full")}
                  </p>
                  <p className="text-xl text-gray-500 mb-4 font-bold sm:hidden text-center">
                    {getCategoryTagline(category, "short")}
                  </p>
                </Link>

                {/* <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:pb-2 sm:scrollbar-thin sm:scrollbar-thumb-white/20"> */}
                <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:scrollbar-thin sm:scrollbar-thumb-white/20">
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
