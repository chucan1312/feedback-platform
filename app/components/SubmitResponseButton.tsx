"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitResponseButton({
  formSlug,
  formId,
  answers,
  isValid,
}: {
  formSlug: string;
  formId: string;
  answers: Record<string, unknown>;
  isValid: boolean;
}) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function submitResponse() {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `/api/forms/${formId}/responses`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            answers,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Failed to submit response"
        );
      }

      router.push(
        `/f/${formSlug}/thanks`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const disabled =
    !isValid || isSubmitting;

  return (
    <button
      type="button"
      onClick={submitResponse}
      disabled={disabled}
      className={`
        rounded-lg px-4 py-2 font-medium transition-colors
        ${
          disabled
            ? "cursor-not-allowed bg-zinc-300 text-zinc-500"
            : "bg-black text-white hover:bg-zinc-800"
        }
      `}
    >
      {isSubmitting
        ? "Submitting..."
        : "Submit"}
    </button>
  );
}