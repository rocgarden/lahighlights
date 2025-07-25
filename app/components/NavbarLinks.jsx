"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavbarLinks({ onClick }) {
  const { data: session, status } = useSession();

  return (
    <>
      {/* ✅ Admin badge */}
      {session?.user?.isAdmin && (
        <li className="text-xs text-white-500 px-2 py-1">
          🛠 Logged in as:{" "}
          <span className="font-medium">{session.user.email}</span>
        </li>
      )}
      <li>
        <Link href="/" onClick={onClick}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/itineraries" onClick={onClick}>
          Itineraries
        </Link>
      </li>
      <li>
        <Link href="/Featured" onClick={onClick}>
          Featured Places
        </Link>
      </li>
      <li>
        <Link href="/privacy-policy" onClick={onClick}>
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link href="/about" onClick={onClick}>
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={onClick}>
          Contact
        </Link>
      </li>

      {session?.user?.isAdmin && (
        <>
          <li>
            <Link href="/items/new" onClick={onClick}>
              New Item
            </Link>
          </li>
          <li>
            <Link href="/itineraries/new" onClick={onClick}>
              New Itinerary
            </Link>
          </li>
          <li>
            <Link href="/my-posts" className="text-sm text-blue-600">
              Manage My Items
            </Link>
          </li>
          <li>
            <Link href="/My-Itineraries" className="text-sm text-blue-600">
              Manage My Itineraries
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                signOut();
                onClick?.();
              }}
              className="underline"
            >
              Sign Out
            </button>
          </li>
        </>
      )}
      {!session && status !== "loading" && (
        <li>
          <Link href="/signin" onClick={onClick}>
            Sign In
          </Link>
        </li>
      )}
    </>
  );
}
