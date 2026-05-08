"use client";

import { useRouter } from "next/navigation";

export default function SubmitResponseButton({
    formSlug,
    formId,
    answers,
}: {
    formSlug: string;
    formId: string;
    answers: Record<string, unknown>;
}) {
    const router = useRouter();

    async function submitResponse() {
        const res = await fetch(
            `/api/forms/${formId}/responses`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answers,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to submit response"
            );
        }

        router.push(`/f/${formSlug}/thanks`);
    }

    return (
        <button type="button" onClick={submitResponse}>
            Submit
        </button>
    );
}