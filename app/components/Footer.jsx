// app/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-black/80 text-white px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold mb-3">LOS ANGELES</h2>
          <p className="text-sm text-white/70">
            Discover top spots, hidden gems, and local favorites in LA.
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <h3 className="text-lg font-medium mb-2">Navigation</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/category/places" className="hover:underline">
                Places
              </a>
            </li>
            <li>
              <a href="/category/cafes" className="hover:underline">
                Cafes
              </a>
            </li>
            <li>
              <a href="/Featured" className="hover:underline">
                Featured
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
            </li>
            <li>
              <a href="/signin" className="hover:underline">
                Submit Post
              </a>
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
              <a href="mailto:contact@example.com" className="hover:underline">
                Email Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-white/40 border-t border-white/10 pt-6">
        &copy; {new Date().getFullYear()} Los Angeles Highlights. All rights
        reserved.
      </div>
      <div className="mt-16 text-xs text-white/40 border-t border-white/20 pt-6">
        <strong>Disclaimer:</strong> All content provided on this site is for
        general informational purposes only. Always check ahead for
        availability, allergens, accessibility, and other personal needs. Use at
        your own risk. See{" "}
        <a href="/terms" className="hover:underline">
          Terms
        </a>
      </div>
    </footer>
  );
}
