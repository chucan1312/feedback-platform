import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feedback Platform",
  description: "Anonymous feedback with AI-powered insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
        variables: {
          colorPrimary: "#000000",
          colorBackground: "#ffffff",
          colorText: "#111827",
          colorInputBackground: "#ffffff",
          colorInputText: "#111827",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "shadow-xl border border-gray-200 rounded-2xl",
          headerTitle: "text-xl font-semibold",
          headerSubtitle: "text-gray-500",
          formButtonPrimary:
            "bg-black hover:bg-gray-800 text-white rounded-xl",
          formFieldInput:
            "rounded-xl border-gray-300 focus:ring-black focus:border-black",
          footerActionLink: "text-black hover:text-gray-700",
        },
      }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}