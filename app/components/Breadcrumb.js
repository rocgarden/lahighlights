// components/Breadcrumb.js
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ items }) {
  const pathname = usePathname();
  const pathParts = pathname.split("?")[0].split("/").filter(Boolean);

 // const router = useRouter();

  // If manual items are provided, use them
  if (items && items.length > 0) {
    return (
      <nav className="text-sm text-gray-500 mb-4 px-2">
        {items.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline text-blue-600 capitalize"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium capitalize">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && <span className="mx-1">&gt;</span>}
          </span>
        ))}
      </nav>
    );
  }

  // Fallback: build from URL path (safe, but generic)
  //const pathParts = router.asPath.split("?")[0].split("/").filter(Boolean);

  if (pathParts.length === 0) return null; // No breadcrumb on homepage

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link href="/" className="hover:underline text-blue-600">
        Home
      </Link>
      {pathParts.map((part, index) => {
        const label = decodeURIComponent(part.replace(/-/g, " "));
        const href = "/" + pathParts.slice(0, index + 1).join("/");
        const isLast = index === pathParts.length - 1;

        return (
          <span key={index}>
            <span className="mx-1">&gt;</span>
            {isLast ? (
              <span className="text-gray-700 font-medium capitalize">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:underline text-blue-600 capitalize"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
