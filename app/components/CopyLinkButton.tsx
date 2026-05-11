// app/components/CopyLinkButton.tsx
"use client";

import { useState } from "react";

export default function CopyLinkButton({
    link,
}: {
    link: string;
}) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(link);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <button
            onClick={handleCopy}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}