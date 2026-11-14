import { Sparkles } from 'lucide-react';

/**
 * Tarjeta flotante que muestra el contenido de `data-tip`.
 * Se posiciona junto al elemento y se "voltea" hacia arriba si no hay
 * espacio suficiente debajo (por ejemplo, en la barra inferior).
 */
export default function TooltipLayer({ tip }) {
    if (!tip) return null;

    const width = 288;
    const margin = 12;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const center = tip.rect.left + tip.rect.width / 2;
    const left = Math.min(Math.max(center, width / 2 + margin), viewportWidth - width / 2 - margin);
    const spaceBelow = viewportHeight - tip.rect.bottom;
    const above = spaceBelow < 170;
    const top = above ? tip.rect.top - 10 : tip.rect.bottom + 10;

    return (
        <div
            role="tooltip"
            className={`pointer-events-none fixed z-[100] -translate-x-1/2 ${above ? '-translate-y-full' : ''}`}
            style={{ left, top, width }}
        >
            <div className="animate-tooltip-in rounded-2xl border border-violet-200/80 bg-white/95 p-3 shadow-2xl shadow-violet-500/15 backdrop-blur dark:border-violet-400/25 dark:bg-slate-900/95">
                <div className="flex items-start gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                        {tip.title && (
                            <p className="text-xs font-extrabold leading-tight text-slate-800 dark:text-slate-100">{tip.title}</p>
                        )}
                        <p className={`text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 ${tip.title ? 'mt-0.5' : ''}`}>
                            {tip.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
