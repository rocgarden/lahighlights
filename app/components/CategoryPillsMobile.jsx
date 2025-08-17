import Link from "next/link";

const categories = [
//   {
//     label: "📍 All",
//     slug: "all",
//     className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
//   },
  {
    label: "☕ Cafes",
    slug: "cafes",
    className: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  },
  {
    label: "🌇 Events",
    slug: "events",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  {
    label: "🎨 Museums",
    slug: "museums",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  {
    label: "🌴 Parks",
    slug: "parks",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  {
    label: "🍜 Eats",
    slug: "eats",
    className: "bg-orange-100 text-rose-800 hover:bg-rose-200",
  },
    {
    label: "🍜 Places",
    slug: "places",
    className: "bg-rose-100 text-rose-800 hover:bg-rose-200",
  },
];

export default function CategoryPillsMobile() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4 px-4 sm:hidden">
      {categories.map(({ label, slug,index, className }) => (
        <Link
          key={slug}
          href={`/category/${slug}`}
          className={`px-4 py-2 text-sm rounded-full font-medium transition ${className}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
