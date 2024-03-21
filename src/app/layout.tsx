import Navbar from "@/components/Navbar/Navbar";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import MenuBar from "@/components/MenuBar/MenuBar";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Progress Pact",
  description: "Progress Pact app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          <Navbar />
          <main style={{ marginTop: "76px" }}>
            <div className="">{children}</div>
          </main>
          <div className="fixed bottom-0 flex w-full">
            <MenuBar />
          </div>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
