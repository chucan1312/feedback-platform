"use client";

import { useState } from "react";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export function FeedbackAssistant({ formId }: { formId: string }) {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);

    async function askQuestion() {
        if (!question.trim() || loading) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formId,
                    question: userMessage.content,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to ask question");
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer || "No answer returned.",
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {open && (
                <div className="mb-3 flex h-[420px] w-[340px] flex-col rounded-2xl border bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <div>
                            <h3 className="font-semibold">Feedback Assistant</h3>
                            <p className="text-xs text-gray-500">
                                Ask questions about survey responses
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
                        {messages.length === 0 && (
                            <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
                                Try asking: “What are users most frustrated about?”
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`rounded-xl p-3 ${message.role === "user"
                                        ? "ml-8 bg-black text-white"
                                        : "mr-8 bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {message.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="mr-8 rounded-xl bg-gray-100 p-3 text-gray-500">
                                Thinking...
                            </div>
                        )}
                    </div>

                    <div className="border-t p-3">
                        <div className="flex gap-2">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") askQuestion();
                                }}
                                placeholder="Ask about feedback..."
                                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                            />

                            <button
                                onClick={askQuestion}
                                disabled={loading || !question.trim()}
                                className="rounded-xl bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!open &&
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-800"
                >
                    Ask AI
                </button>
            }
        </div>
    );
}