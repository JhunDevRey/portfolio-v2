import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile, skillCategories, SITE_URL, SEO_DESCRIPTION } from "@/app/lib/data";
import { Preloader } from "@/app/components/Preloader";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${profile.name}` },
  description: SEO_DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: profile.name,
    locale: "en_US",
    type: "profile",
    firstName: "Jhun Daverey",
    lastName: "Parol",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SEO_DESCRIPTION,
  },
  formatDetection: { telephone: false },
  verification: { google: "IhVhDa0M5-35TCa5oh1oUZp_xHUkSWciuFAKBJd9KJ4" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f2f1ec" },
  ],
};

// Structured data so search engines understand who the site is about.
const personId = `${SITE_URL}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: SITE_URL,
      image: `${SITE_URL}/images/iam_me/profjhun1nbg.png`,
      jobTitle: "Full-Stack Developer",
      description: profile.bio,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Davao City",
        addressCountry: "PH",
      },
      knowsAbout: skillCategories.flatMap((c) => c.items),
      sameAs: [profile.social.github, profile.social.linkedin, profile.social.facebook],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: title,
      description: SEO_DESCRIPTION,
      inLanguage: "en",
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: profile.name,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${funnelSans.variable} ${funnelDisplay.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=Date.now(),d=document.documentElement,f=false;d.setAttribute("data-pl","");function done(){if(f)return;f=true;setTimeout(function(){d.setAttribute("data-loaded","")},Math.max(0,1300-(Date.now()-s)))}if(document.readyState==="complete")done();else{window.addEventListener("load",done);setTimeout(done,4500)}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`#preloader{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-fg"
        >
          Skip to content
        </a>
        <Preloader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
