"use client";

import { useState } from "react";
import SubmitResponseButton from "./SubmitResponseButton";

import {
  PublicForm,
  PublicQuestion,
  FormAnswers,
  FormAnswerValue,
} from "@/app/types/form-builder";

export default function PublicFormRenderer({
  form,
  questions,
}: {
  form: PublicForm;
  questions: PublicQuestion[];
}) {
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = questions.every((question) => {
    if (!question.required) return true;

    const answer = answers[question.id];

    if (typeof answer === "number") return answer >= 1 && answer <= 10;
    if (typeof answer === "string") return answer.trim() !== "";

    return false;
  });

  function handleChange(questionId: string, value: FormAnswerValue) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  }

  return (
    <div className="mt-8 space-y-5">
      {questions.map((question) => (
        <div
          key={question.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <label className="block text-sm font-medium text-gray-900">
            {question.text}
            {question.required && <span className="ml-1 text-red-500">*</span>}
          </label>

          <div className="mt-3">
            {question.type === "text" && (
              <input
                type="text"
                value={String(answers[question.id] ?? "")}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            )}

            {question.type === "textarea" && (
              <textarea
                rows={4}
                value={String(answers[question.id] ?? "")}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            )}

            {question.type === "mcq" && (
              <div className="space-y-2">
                {(question.options ?? []).map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleChange(question.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === "rating" && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => {
                  const selected = answers[question.id] === rating;

                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleChange(question.id, rating)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {rating}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {errors[question.id] && (
            <p className="mt-2 text-sm text-red-500">{errors[question.id]}</p>
          )}
        </div>
      ))}

      <SubmitResponseButton
        formSlug={form.slug}
        formId={form.id}
        answers={answers}
        isValid={isValid}
      />
    </div>
  );
}