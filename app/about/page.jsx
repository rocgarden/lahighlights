import Link from "next/link"; 
import Breadcrumb from "../components/Breadcrumb"; 
export const metadata = {
  title: "About Us | LA Highlights",
  description: "Learn about the purpose and mission of LA Highlights.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto my-20 px-6 py-10 text-gray-800">
       <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About"}
        ]}
      />      
      <div>
      <h1 className="text-3xl font-bold mb-6">About Norah Bird | LA Highlights</h1>
      </div>

      <p className="mb-4">
        Norah Bird | LA Highlights is a curated travel and lifestyle guide created to help
        locals and visitors explore the vibrant neighborhoods of Los Angeles.
      </p>

      <p className="mb-4">
        Whether you're searching for hidden murals, authentic eats, or
        off-the-beaten-path itineraries, we’re here to help you discover LA your
        way.
      </p>

      <p className="mb-4">
        We believe travel should be joyful, local-first, and creatively
        inspiring. Every itinerary, post, and feature is designed to help you
        make the most of your time in Los Angeles.
      </p>

      <p className="mb-4">
        Currently maintained by a small team (and built by hand 🛠️), we’ll
        continue expanding as our community grows. 
      </p>
      <div>
          <img
        src="/LA.png"
        alt="LA Vibes"
        className="w-18 h-18 mx-auto animate-wiggle"
      />
      </div>
      <div className="mt-8 text-xs text-gray/40 text-end pt-3">
        See{" "}
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>{" "}
        of use. 
      </div>
    </main>
  );
}
