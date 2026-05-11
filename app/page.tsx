"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
    return (
        <main className="bg-white text-black">
            {/* HERO */}
            <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-6 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600">
                    Anonymous feedback, powered by AI
                </div>

                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                    Understand feedback,
                    <span className="text-zinc-500"> not just collect it.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                    Build anonymous forms, gather honest responses, and turn them into
                    sentiment, themes, and actionable insights.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/dashboard"
                        className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                        Get started
                    </Link>

                    <Link
                        href="/f/demo-feedback"
                        className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-100"
                    >
                        Preview AI insights
                    </Link>
                </div>
            </section>

            {/* FEATURES */}
            <section
                id="features"
                className="mx-auto max-w-7xl px-6 py-20"
            >
                <h2 className="text-center text-3xl font-semibold tracking-tight">
                    Built for understanding feedback
                </h2>

                <div className="mt-12 grid gap-6 md:grid-cols-4">
                    <FeatureCard
                        title="Feedback chatbot"
                        description="Explore survey responses by asking questions and getting context-aware answers."
                    />
                    <FeatureCard
                        title="Multi-dimensional sentiment (In progress)"
                        description="Analyze tone, intent, urgency, and confidence instead of basic positive/negative labels."
                    />
                    <FeatureCard
                        title="AI moderation"
                        description="Automatically detect and flag inappropriate or low-quality responses."
                    />
                    <FeatureCard
                        title="Actionable insights"
                        description="Group feedback into themes and get clear suggestions on what to improve."
                    />
                </div>
            </section>

            {/* PREVIEW */}
            <section
                id="preview"
                className="mx-auto max-w-6xl px-6 pb-24"
            >
                {/* <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-500">Feedback insights</p>
                                <h3 className="text-xl font-semibold">
                                    Team Retrospective
                                </h3>
                            </div>
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                                Live preview
                            </span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <InsightStat label="Tone" value="Constructive" />
                            <InsightStat label="Top theme" value="Workload" />
                            <InsightStat label="Urgency" value="Medium" />
                        </div>

                        <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                            <p className="text-sm font-medium">AI summary</p>
                            <p className="mt-2 text-sm text-zinc-600 leading-6">
                                Most responses are constructive but highlight recurring concerns
                                around workload, unclear priorities, and communication gaps.
                            </p>
                        </div>
                    </div>
                </div> */}
            </section>
            <section id="faq" className="mx-auto max-w-4xl px-6 pb-24">
                <h2 className="text-center text-3xl font-semibold tracking-tight">
                    Frequently asked questions
                </h2>

                <div className="mt-10 space-y-4">
                    <FAQItem
                        question="Is feedback actually anonymous?"
                        answer="Yes. Public form submissions do not require an account. The form owner only sees submitted answers and analysis."
                    />
                    <FAQItem
                        question="What does AI analyze?"
                        answer="Responses can be analyzed for tone, intent, urgency, moderation flags, themes, and summary insights."
                    />
                    <FAQItem
                        question="Can I still view raw responses?"
                        answer="Yes. AI insights help summarize patterns, but the original responses remain available to the form owner."
                    />
                </div>
            </section>
        </main>
    );
}

function FeatureCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-zinc-600 leading-6">
                {description}
            </p>
        </div>
    );
}

function InsightStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-2 text-lg font-semibold">{value}</p>
        </div>
    );
}


function FAQItem({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <span className="font-medium">{question}</span>

                <span
                    className={`text-zinc-500 font-bold transition-transform ${open ? "rotate-180" : ""
                        }`}
                >
                    <ChevronDown />
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="px-5 pb-5 text-sm leading-6 text-zinc-600">
                    {answer}
                </p>
            </div>
        </div>
    );
}