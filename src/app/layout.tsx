import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { GlobalScrollbarProvider } from "@/lib/providers/global-scrollbar-provider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Shuvadipta Das | Full Stack Developer",
  description:
    "Shuvadipta Das is a Full Stack Developer specializing in Next.js, React, TypeScript, and Node.js. Building robust web applications and seamless digital experiences.",
  keywords: [
    "Shuvadipta Das",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Motion",
    "Framer Motion",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [
    {
      name: "Shuvadipta Das",
      url: process.env.NEXT_PUBLIC_APP_URL || "https://shoob.me",
    },
  ],
  creator: "Shuvadipta Das",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://shoob.me"),
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Shuvadipta Das",
    title: "Shuvadipta Das | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, and Node.js. Building robust web applications and seamless digital experiences.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shuvadipta Das - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuvadipta Das | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, and Node.js.",
    images: ["/opengraph-image"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className={inter.className}>
        <NextTopLoader
          color="hsl(var(--accent))"
          showSpinner={false}
          height={3}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalScrollbarProvider />
          <CustomCursor />
          {children}
          <JsonLd />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>

        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
