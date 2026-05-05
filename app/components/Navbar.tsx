"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  const isAppRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/forms");

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          FeedbackAI
        </Link>

        {isAppRoute ? (
          <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <Link href="/dashboard" className="hover:text-black">
              Dashboard
            </Link>
            <Link href="/forms/new" className="hover:text-black">
              New Form
            </Link>
          </div>
        ) : (
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
        )}

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton fallbackRedirectUrl="/dashboard">
              <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
                Log in
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            {!isAppRoute && (
              <Link
                href="/dashboard"
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
              >
                Dashboard
              </Link>
            )}
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}