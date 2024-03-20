import Navbar from "@/components/Navbar/Navbar";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl">
            <div className="m-5">{children}</div>
          </main>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
