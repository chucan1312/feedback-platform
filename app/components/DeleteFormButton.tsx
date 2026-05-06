"use client";

import { useRouter } from "next/navigation";

export default function DeleteFormButton({
    formId,
}: {
    formId: string;
}) {
    const router = useRouter();

    async function deleteForm() {
        const res = await fetch(`/api/forms/${formId}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to delete form"
            );
        }

        router.refresh();
    }

    return (
        <button onClick={deleteForm}>
            Delete
        </button>
    );
}