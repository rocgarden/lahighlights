"use client";

import Image from "next/image";
import { useState } from 'react';

// import { MapPin, Globe } from "lucide-react";


export default function PostCard({ post, showDescription = false }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative h-fit rounded-lg overflow-hidden group shadow-lg  border-white/10 bg-white/50">
      {/* Background Image or Video */}
      <div className="relative h-64 w-full">
      {post.videoUrl ? (
        <video
          src={post.videoUrl}
          poster={post.posterUrl}
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={post.imageUrl || "/fallback.jpg"}
          alt={post.title + " - Norah Bird Travel"}
          // className="absolute inset-0 object-cover w-full h-full"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={post.isAboveTheFold} // use only if above-the-fold
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition" />

      {/* Bottom-aligned content */}
      <div className="absolute bottom-0 left-0  right-0 p-4 z-10 text-white">
        {
          <a
            href={post.addressLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Website"
            className="flex hover:text-green-300 transition"
          >
            <span>🌎</span>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {/* <Globe className="w-5 h-5" /> */}
          </a>
        }
        <div className="flex">
          <span>📍</span>
          {post.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                post.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Get Directions"
              className="hover:text-blue-300 transition"
            >
              <p className="text-white/80 hover:text-blue-400 text-sm line-clamp-2">
                {post.address}
              </p>
              {/* <MapPin className="w-5 h-5" /> */}
            </a>
          )}
          {/* <div> */}
            {/* 🌎{" "}
            {post.website && (
              <a
                href={post.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Website"
                className="hover:text-green-300 transition"
              >
              </a>
            )} */}
          </div>
        </div>
      </div>
      {/* Optional Description for category pages */}
      {showDescription && post.content && (
        <div className="p-4 text-black text-sm text-justify border-t border-white/30">
 <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
      {post.content}
    </p>
         {post.content.length > 100 && (
          <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-300 underline text-xs"
         >
        {isExpanded ? 'Read less ▲' : 'Read more ▼'}
        </button>
          )}
      </div>
      )}
    </div>
  );
}
