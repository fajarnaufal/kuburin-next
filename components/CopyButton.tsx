'use client';
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded text-sm font-semibold transition-colors
                ${copied
                    ? 'bg-green-700 text-white'
                    : 'bg-kubur-gray border border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
            aria-label="Copy to clipboard"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}
