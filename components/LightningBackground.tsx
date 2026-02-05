'use client';
import { useEffect, useState } from 'react';

export default function LightningBackground() {
    const [lightningStyle, setLightningStyle] = useState({
        opacity: 0.1,
        filter: 'grayscale(100%) brightness(0.3) blur(1px)',
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const triggerLightning = () => {
            // Random duration before next lightning (3s to 8s)
            const nextDelay = 3000 + Math.random() * 5000;

            // Flash sequence
            const flash = async () => {
                // High intensity
                setLightningStyle({
                    opacity: 0.6 + Math.random() * 0.2,
                    filter: 'grayscale(80%) brightness(1.2) blur(0px)',
                });
                await new Promise(r => setTimeout(r, 50));

                // Dip
                setLightningStyle({
                    opacity: 0.1,
                    filter: 'grayscale(100%) brightness(0.3) blur(2px)',
                });
                await new Promise(r => setTimeout(r, 50));

                // Secondary flash (sometimes)
                if (Math.random() > 0.3) {
                    setLightningStyle({
                        opacity: 0.4 + Math.random() * 0.2,
                        filter: 'grayscale(90%) brightness(0.8) blur(0px)',
                    });
                    await new Promise(r => setTimeout(r, 100));
                }

                // Return to dark
                setLightningStyle({
                    opacity: 0.1,
                    filter: 'grayscale(100%) brightness(0.3) blur(1px)',
                });
            };

            flash();
            timeoutId = setTimeout(triggerLightning, nextDelay);
        };

        // Start loop
        timeoutId = setTimeout(triggerLightning, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-all duration-75 ease-in-out"
            style={{
                backgroundImage: "url('/graveyard.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                ...lightningStyle,
            }}
        />
    );
}
