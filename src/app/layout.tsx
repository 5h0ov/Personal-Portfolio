import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Changed from Syne to just Space Grotesk for headings
import Script from "next/script";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { GlobalScrollbarProvider } from '@/lib/providers/global-scrollbar-provider';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: "Shuvadipta Das | Portfolio",
  description: "A modern portfolio built with Next.js, TypeScript, and Framer Motion.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalScrollbarProvider />
          <CustomCursor />
          {children}
        </ThemeProvider>

        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
