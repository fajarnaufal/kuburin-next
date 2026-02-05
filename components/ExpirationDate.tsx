'use client';

import { useEffect, useState } from 'react';

export default function ExpirationDate({ date }: { date: Date | null }) {
    // Avoid hydration mismatch by only rendering on client
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!date) return <span>Expires: Never</span>;
    if (!mounted) return <span>Expires: ...</span>; // Placeholder to avoid hydration mismatch

    return <span>Expires: {new Date(date).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })}</span>;
}
