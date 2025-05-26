"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import NavbarLinks from "./NavbarLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); //check on load
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "w-full fixed top-0 left-0 z-50 px-6 flex items-center justify-between transition-all duration-300 ease-in-out",
        {
          // On home and not scrolled: semi-transparent over hero
          "bg-white/10 backdrop-blur-md text-white": isHome && !isScrolled,
          // Otherwise: dark background
          "bg-black/80 text-white shadow-md": !isHome || isScrolled,
          // Optional: adjust padding if you like
          "py-4": !isScrolled,
          "py-2": isScrolled,
        }
      )}
    >
      {/* Logo */}
      <div className="h-8 mt-3 flex items-center text-2xl font-bold text-white">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/norahLogo.png"
            alt="Logo"
            className="h-[10rem] w-auto object-contain"
          />
          {/* <span>Norah Bird</span> */}
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
        <NavbarLinks />
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-[4px]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-[2px] bg-white" />
        <div className="w-6 h-[2px] bg-white" />
        <div className="w-6 h-[2px] bg-white" />
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-black/90 text-white flex flex-col gap-6 p-6 md:hidden">
          <NavbarLinks onClick={() => setIsOpen(false)} />
        </ul>
      )}
    </nav>
  );
}
