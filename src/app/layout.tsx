import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeMaster — Elite Programming Education",
    template: "%s | CodeMaster",
  },
  description:
    "Join 15,000+ elite engineers. Master production-grade systems, ship real-world projects, and accelerate your career with industry-standard courses.",
  keywords: [
    "programming courses",
    "elite coding bootcamp",
    "learn react",
    "web development",
    "data science",
    "devops",
    "CodeMaster",
  ],
  authors: [{ name: "CodeMaster" }],
  creator: "CodeMaster Global",
  metadataBase: new URL("https://codemaster.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codemaster.dev",
    siteName: "CodeMaster",
    title: "CodeMaster — Elite Programming Education",
    description:
      "Join 15,000+ elite engineers. Master production-grade systems with industry-leading courses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeMaster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMaster — Elite Programming Education",
    description:
      "Master production-grade systems with CodeMaster's elite courses.",
    creator: "@codemaster",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
