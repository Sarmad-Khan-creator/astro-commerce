import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSans.variable}`}>
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
