"use client";

import QuestionCard from "@/app/components/QuestionCard";
import { BuilderQuestion } from "@/app/types/form-builder";
import { useState } from "react";

export default function NewFormPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<BuilderQuestion[]>([]);
  const [description, setDescription] = useState("");

  async function publishForm() {
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        questions,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to save form");
    }

    window.location.href = `/dashboard`;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            Create a new feedback form
          </h1>
          <p className="mt-2 text-gray-600">
            Build a custom form to collect anonymous feedback and insights.
          </p>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Form title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Product feedback survey"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly explain what this form is for"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Questions
              </h2>
              <p className="text-sm text-gray-500">
                Add the questions respondents will answer.
              </p>
            </div>

            <button
              onClick={() =>
                setQuestions((prev) => [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    text: "",
                    type: "text",
                    required: true,
                    order: prev.length + 1,
                  },
                ])
              }
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700"
            >
              Add question
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="font-medium text-gray-900">No questions yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Click “Add question” to start building your form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  onChange={(updated) => {
                    setQuestions((prev) =>
                      prev.map((item) =>
                        item.id === updated.id ? updated : item
                      )
                    );
                  }}
                  onDelete={(id) => {
                    setQuestions((prev) =>
                      prev.filter((item) => item.id !== id)
                    );
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={publishForm}
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            Publish form
          </button>
        </div>
      </div>
    </main>
  );
}