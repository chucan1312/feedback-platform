"use client";

import { useRouter } from "next/navigation";

export default function EditFormButton({
    formId,
}: {
    formId: string;
}) {
    
    return (
        <button onClick={() => window.location.href = `/forms/${formId}`}>
            Edit
        </button>
    );
}