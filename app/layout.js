import { Geist, Geist_Mono, Bakbak_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bakbak = Bakbak_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bakbak",
});


export const metadata = {
  metadataBase: new URL("https://norahbird.com"),
  title: "Norah Bird | Discover Local Itineraries and Hidden Travel Gems",
  description:
    "Explore curated travel itineraries, handpicked destinations, and insider tips from the Norah Bird community.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Norah Bird",
    description: "Discover local itineraries, places, and travel tips",
    type: "website",
    url: "https://norahbird.com",
    images: [
      {
        url: "/norah.png",
        width: 1200,
        height: 630,
        alt: "Norah Bird",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NorahBird",
    title: "Norah Bird",
    description: "Explore curated travel itineraries and local adventures.",
    images: ["/norah.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head>
        {/* Google Analytics (GA4) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ELC931G9SX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ELC931G9SX');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bakbak.variable} antialiased overflow-x-hidden`}
      >
        <Provider>
          <Navbar />
          {children}
          {/* <main className="pt-24 sm:pt-28">{children}</main> */}
        </Provider>
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
