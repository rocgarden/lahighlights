import { notFound } from "next/navigation";
import { generateItineraryMetadata } from "@/lib/utils/generateItineraryMetadata";
import { getItineraryBySlug } from "@/services/itineraryService";

// Metadata for SEO

export async function generateMetadata({ params }) {
  const itinerary = await getItineraryBySlug({ slug: params.slug });
  //const itinerary = await getItineraryBySlug( slug: params.slug );
  return generateItineraryMetadata(itinerary, params.slug);
}

export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Featured Places: Explore Top Travel Picks and Hidden Gems | Norah Bird`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.imageUrl, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}

// Post Page Component
export default async function PostPage({ params }) {
  const post = await getPostById(params.id);
  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto  px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <p className="text-white/80 text-lg mb-6">{post.description}</p>
      <p className="text-sm text-white/60">
        Posted by <span className="font-medium">{post.author}</span> on{" "}
        {post.date}
      </p>
    </main>
  );
}
