"use client";

import { useState } from "react";
import SubmitResponseButton from "./SubmitResponseButton";

import {
    PublicForm,
    PublicQuestion,
    FormAnswers,
} from "@/app/types/form-builder";

export default function PublicFormRenderer({
    form,
    questions,
}: {
    form: PublicForm;
    questions: PublicQuestion[];
}) {
    const [answers, setAnswers] =
        useState<FormAnswers>({});

    function handleChange(
        questionId: string,
        value: string
    ) {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    }

    return (
        <div className="mt-8 space-y-6">
            {questions.map((question) => (
                <div
                    key={question.id}
                    className="space-y-2"
                >
                    <label className="block font-medium">
                        {question.text}

                        {question.required && (
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        )}
                    </label>

                    {question.type === "text" && (
                        <input
                            type="text"
                            value={
                                answers[question.id] || ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    question.id,
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border p-2"
                        />
                    )}

                    {question.type === "textarea" && (
                        <textarea
                            rows={4}
                            value={
                                answers[question.id] || ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    question.id,
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border p-2"
                        />
                    )}
                </div>
            ))}

            <SubmitResponseButton
                formSlug={form.slug}
                formId={form.id}
                answers={answers}
            />
        </div>
    );
}