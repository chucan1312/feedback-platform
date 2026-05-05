import type { Metadata } from "next";
import Link from "next/link";
import {
    ClerkProvider,
    Show,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
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
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black antialiased`}
                >
                    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
                        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                            <Link href="/" className="text-sm font-semibold tracking-tight">
                                FeedbackAI
                            </Link>

                            <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
                                <Link href="/#features" className="hover:text-black">
                                    Features
                                </Link>
                                <Link href="/#preview" className="hover:text-black">
                                    Preview
                                </Link>
                                <Link href="/#faq" className="hover:text-black">
                                    FAQ
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Show when="signed-out">
                                    <SignInButton fallbackRedirectUrl="/dashboard">
                                        <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
                                            Log in
                                        </button>
                                    </SignInButton>
                                </Show>

                                <Show when="signed-in">
                                    <Link
                                        href="/dashboard"
                                        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <UserButton />
                                </Show>
                            </div>
                        </nav>
                    </header>

                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}