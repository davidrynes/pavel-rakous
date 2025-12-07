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

export const metadata: Metadata = {
  title: "Pavel Rakous - Poradce pro správu nemovitostí",
  description: "Odborné poradenství v oblasti správy a investic do nemovitostí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
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
