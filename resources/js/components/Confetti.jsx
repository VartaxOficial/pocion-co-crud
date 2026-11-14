import { useEffect, useState } from 'react';

const COLORS = ['#8b5cf6', '#d946ef', '#f59e0b', '#34d399', '#38bdf8', '#fb7185'];

/**
 * Confeti sutil creado con elementos del DOM + una animación CSS.
 * Se dispara con `burst` (un número que incrementa) y se autolimpia.
 */
export default function Confetti({ burst }) {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        if (!burst) return undefined;

        const nextPieces = Array.from({ length: 70 }).map((_, index) => ({
            id: `${burst}-${index}`,
            left: Math.random() * 100,
            size: 5 + Math.random() * 7,
            delay: Math.random() * 0.25,
            duration: 1.9 + Math.random() * 1.2,
            drift: (Math.random() - 0.5) * 180,
            color: COLORS[index % COLORS.length],
            round: Math.random() > 0.5,
        }));

        setPieces(nextPieces);
        const timer = window.setTimeout(() => setPieces([]), 3400);

        return () => window.clearTimeout(timer);
    }, [burst]);

    if (!pieces.length) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
            {pieces.map((piece) => (
                <span
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: `${piece.left}%`,
                        width: piece.size,
                        height: piece.size * 1.6,
                        backgroundColor: piece.color,
                        borderRadius: piece.round ? '9999px' : '2px',
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        '--drift': `${piece.drift}px`,
                    }}
                />
            ))}
        </div>
    );
}
