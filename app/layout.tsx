import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smoke Shop",
  description: "Smoke Shop your favorite cigarettes",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${outfit.className}`}
      >
        <NextTopLoader color="#000"  />
        <Toaster position="top-center" />

        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}
