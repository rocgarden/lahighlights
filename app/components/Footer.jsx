// app/components/Footer.js
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-black/80 text-white px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold mb-3">NORAH BIRD | Los Angeles Highlights</h2>
          <p className="text-sm text-white/70">
            Discover top spots, hidden gems, and local favorites in LA.
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <h3 className="text-lg font-medium mb-2">Navigation</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/itineraries" className="hover:underline">
                Itineraries
              </Link>
            </li>
            <li>
              <Link href="/category/cafes" className="hover:underline">
                Cafes
              </Link>
            </li>
            <li>
              <Link href="/Featured" className="hover:underline">
                Featured
              </Link>
            </li>
              <li>
              <Link href="/signin" className="hover:underline">
                Submit Post
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
              <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
              <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social / Contact */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium mb-2">Follow Us</h3>
          <ul className="text-sm text-white/70 space-y-1">
            {/* <li>
              <a href="https://twitter.com" className="hover:underline">
                Twitter
              </a>
            </li> */}
            <li>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:hello@norahbird.com" className="hover:underline">
                Email Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-white/40 border-t border-white/20 pt-6">
        &copy; {new Date().getFullYear()} Norah Bird | Los Angeles Highlights. All rights
        reserved.
      </div>
      {/* <div className="text-center text-xs text-white/40">Norah Bird</div> */}
      <div className="mt-10 text-xs text-white/40 border-t border-white/20 pt-3">
        <strong>Disclaimer:</strong> All content provided on this site is for
        general informational purposes only. Always check ahead for
        availability, allergens, accessibility, and other personal needs. Use at
        your own risk. All trademarks and brand names are the property of their
        respective owners. Use of these names, trademarks, and
        brands does not imply endorsement. See{" "}
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>
      </div>
    </footer>
  );
}
