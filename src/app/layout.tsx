import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-notoSans",
});

export const metadata: Metadata = {
  title: "Astro Commerce",
  description:
    "An astro commerce website is a plateform where customers can search for products and services and then buy it",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${notoSans.variable}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
