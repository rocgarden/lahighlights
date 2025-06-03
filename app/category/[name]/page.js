import { notFound } from "next/navigation";

import { getItemsByCategory } from "@/services/itemService";
import { getAllCategories } from "@/services/itemService";
import PostCard from "@/app/components/PostCard";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import TermsPage from "@/app/terms/page";
import Disclaimer from "@/app/components/Disclaimer";
export const dynamicParams = true; // Allow dynamic fallback if needed (optional)

export async function generateStaticParams() {
  const items = await getAllCategories();

  const categories = Array.from(
    new Set(items.map((item) => item.category?.toLowerCase()).filter(Boolean))
  );

  return categories.map((category) => ({
    name: category,
  }));
}

export async function generateMetadata({ params }) {
  const name =  params?.name || 'Category';
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | Category | MyApp`,
    description: `Explore all posts in the ${name} category.`,
  };
}

export const revalidate = 86400;

export default async function CategoryPage({ params }) {
  const category =  params?.name;
  const posts = await getItemsByCategory(category);

  if (!posts || posts.length === 0) {
    return (
      <div className="px-6 py-12 text-white">
        <h1 className="text-3xl font-bold">No posts found in {category}</h1>
      </div>
    );
  }

  return (
    <section className="px-16 py-2 mt-32 max-w-7xl mx-auto text-black/80">
      {/* <h1 className="text-4xl font-bold mb-10 capitalize"> */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category }, // no href for the current page
        ]}
      />
      <h1 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-4xl mb-5 font-bold">
        Top {category}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="mt-36 text-sm text-black/60 border-t border-black/20 pt-6">
        ⚠️ <strong>Disclaimer:</strong> This post is for inspiration only.
        Always check ahead for availability, allergens, accessibility, and other
        personal needs. Use at your own risk. See{" "}
        <Link href="/terms">Terms.</Link>
      </div>{" "}
    </section>
  );
}
