import Image from "next/image";
import Link from "next/link";

export default function FeaturedGrid({ featuredItems = [] }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6">
      {featuredItems.map((item) => (
        <div
          key={item._id}
          className="relative overflow-hidden rounded-xl shadow-lg group hover:shadow-2xl transition"
        >
          {/* Image Block */}
          <div className="relative w-full h-60">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* ✅ Metadata Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>

              <div className="text-sm opacity-80 mb-1 space-y-0.5">
                {/* {item.date && (
                  <p>📅 {new Date(item.date).toLocaleDateString()}</p>
                )} */}
                {item.city && <p>📍 {item.city}</p>}
                {item.category && <p>🏷️ {item.category}</p>}
              </div>

              {item.subtitle && (
                <p className="text-sm line-clamp-2">{item.subtitle}</p>
              )}

              <a
                href={item.addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm underline hover:text-blue-400"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
