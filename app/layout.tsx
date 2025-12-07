import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import Header from "@/components/Header";
import FooterWrapper from "@/components/FooterWrapper";

const ivyPresto = localFont({
  src: "../font/Ivy-Presto-Text-Light.otf",
  variable: "--font-heading",
  display: "swap",
});

const instrumentSans = localFont({
  src: "../font/InstrumentSans-VariableFont_wdth,wght.ttf",
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://pavelrakous.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pavel Rakouš | Poradce pro správu nemovitostí",
    template: "%s | Pavel Rakouš",
  },
  description: "Odborné poradenství v oblasti správy bytových domů, SVJ, družstev a realit. Více než 25 let zkušeností v oboru.",
  keywords: [
    "správa nemovitostí",
    "SVJ",
    "bytové družstvo",
    "správa bytových domů",
    "poradenství nemovitosti",
    "Pavel Rakouš",
    "realitní poradenství",
    "vyúčtování služeb",
    "správa SVJ",
  ],
  authors: [{ name: "Pavel Rakouš" }],
  creator: "Pavel Rakouš",
  publisher: "Pavel Rakouš",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Pavel Rakouš",
    title: "Pavel Rakouš | Poradce pro správu nemovitostí",
    description: "Odborné poradenství v oblasti správy bytových domů, SVJ, družstev a realit. Více než 25 let zkušeností v oboru.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pavel Rakouš - Poradce pro správu nemovitostí",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel Rakouš | Poradce pro správu nemovitostí",
    description: "Odborné poradenství v oblasti správy bytových domů, SVJ, družstev a realit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "cs-CZ": siteUrl,
      "en-US": `${siteUrl}/en`,
    },
  },
};

// Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pavel Rakouš",
  jobTitle: "Poradce pro správu nemovitostí",
  description: "Odborné poradenství v oblasti správy bytových domů, SVJ, družstev a realit",
  url: siteUrl,
  sameAs: [],
  knowsAbout: [
    "Správa nemovitostí",
    "SVJ",
    "Bytová družstva",
    "Vyúčtování služeb",
    "Realitní poradenství",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${ivyPresto.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <FooterWrapper />
        </LanguageProvider>
      </body>
    </html>
  );
}
