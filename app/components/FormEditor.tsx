"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BuilderQuestion } from "@/app/types/form-builder";

type FormEditorForm = {
    id: string;
    title: string;
    description: string | null;
    questions: BuilderQuestion[];
};

export default function FormEditor({
    form,
    hasResponses,
}: {
    form: FormEditorForm;
    hasResponses: boolean;
}) {
    const router = useRouter();

    const [title, setTitle] = useState(form.title);
    const [description, setDescription] = useState(form.description || "");
    const [questions, setQuestions] = useState<BuilderQuestion[]>(form.questions);

    async function saveForm() {
        const res = await fetch(`/api/forms/${form.id}`, {
            method: "PUT",
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
            throw new Error(data.error || "Failed to update form");
        }

        router.refresh();

        window.location.href = `/dashboard`;
    }

    return (
        <div className="mt-6 space-y-6">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border p-2"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border p-2"
                rows={3}
            />

            <div className="space-y-4">
                {hasResponses && (
                    <p className="text-sm text-zinc-500">
                        Question type and deletion are locked because this form has responses.
                    </p>
                )}
                {questions.map((question, index) => (
                    <div key={question.id} className="rounded-lg border p-4 space-y-2">
                        <input
                            value={question.text}
                            onChange={(e) => {
                                setQuestions((prev) =>
                                    prev.map((q) =>
                                        q.id === question.id
                                            ? { ...q, text: e.target.value }
                                            : q
                                    )
                                );
                            }}
                            className="w-full rounded-lg border p-2"
                        />

                        <select
                            value={question.type}
                            disabled={hasResponses}
                            onChange={(e) => {
                                setQuestions((prev) =>
                                    prev.map((q) =>
                                        q.id === question.id
                                            ? {
                                                ...q,
                                                type: e.target.value as BuilderQuestion["type"],
                                            }
                                            : q
                                    )
                                );
                            }}
                            className="rounded-lg border p-2"
                        >
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="rating">Rating</option>
                        </select>

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={question.required}
                                onChange={(e) => {
                                    setQuestions((prev) =>
                                        prev.map((q) =>
                                            q.id === question.id
                                                ? { ...q, required: e.target.checked }
                                                : q
                                        )
                                    );
                                }}
                            />
                            Required
                        </label>

                        {!hasResponses && <button
                            type="button"
                            disabled={hasResponses}
                            onClick={() => {
                                setQuestions((prev) =>
                                    prev
                                        .filter((q) => q.id !== question.id)
                                        .map((q, newIndex) => ({
                                            ...q,
                                            order: newIndex + 1,
                                        }))
                                );
                            }}
                        >Delete question
                        </button>}

                    </div>
                ))}
            </div>

            <button
                type="button"
                disabled={hasResponses}
                onClick={() => {
                    setQuestions((prev) => [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            text: "",
                            type: "text",
                            required: true,
                            order: prev.length + 1,
                        },
                    ]);
                }}
            >
                Add question
            </button>

            <button type="button" onClick={saveForm}>
                Save changes
            </button>
        </div>
    );
}