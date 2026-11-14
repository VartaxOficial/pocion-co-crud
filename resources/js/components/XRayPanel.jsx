import { Eraser, Eye, Sparkles, X } from 'lucide-react';

import { METHOD_STYLES } from '../lib/constants';
import { shortValue } from '../lib/utils';

/** Mini visor de diferencias estilo Git: verde añade, rojo elimina. */
function JsonDiff({ changes }) {
    if (!changes?.length) return null;

    return (
        <div className="max-h-40 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono text-[10px] leading-relaxed text-slate-300 scrollbar-thin">
            <p className="text-slate-500">{'{'}</p>
            {changes.map((change) => {
                const added = change.before === undefined;
                const removed = change.after === undefined;

                if (added) {
                    return (
                        <p key={change.field} className="break-all pl-2 text-emerald-300">
                            + &quot;{change.field}&quot;: {shortValue(change.after)},
                        </p>
                    );
                }

                if (removed) {
                    return (
                        <p key={change.field} className="break-all pl-2 text-rose-300">
                            - &quot;{change.field}&quot;: {shortValue(change.before)},
                        </p>
                    );
                }

                return (
                    <div key={change.field} className="break-all pl-2">
                        <p className="text-rose-300">
                            - &quot;{change.field}&quot;: {shortValue(change.before)},
                        </p>
                        <p className="text-emerald-300">
                            + &quot;{change.field}&quot;: {shortValue(change.after)},
                        </p>
                    </div>
                );
            })}
            <p className="text-slate-500">{'}'}</p>
        </div>
    );
}

function JsonBlock({ label, value, tone }) {
    const color =
        tone === 'rose'
            ? 'text-rose-300'
            : tone === 'emerald'
              ? 'text-emerald-300'
              : 'text-sky-300';

    return (
        <div>
            <p className={`mb-1 font-mono text-[9px] font-bold uppercase tracking-wider ${color}`}>{label}</p>
            <pre className="max-h-44 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-2 font-mono text-[10px] leading-relaxed text-slate-300 scrollbar-thin">
                {JSON.stringify(value, null, 2)}
            </pre>
        </div>
    );
}

function XRayEvent({ event, isLatest }) {
    const style = METHOD_STYLES[event.method] ?? METHOD_STYLES.GET;

    return (
        <article
            className={`rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-900/70 ${
                isLatest ? 'animate-slide-in ring-2 ring-violet-400/40' : ''
            }`}
        >
            <div className="flex items-center justify-between gap-2">
                <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-black ${style.chip}`}>
                    {event.method}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{event.time}</span>
            </div>

            <p className="mt-2 text-xs font-extrabold leading-snug text-slate-800 dark:text-slate-100">{event.title}</p>

            <code className="mt-1 block break-all rounded-lg bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
                {event.endpoint}
            </code>

            {event.meta?.query && Object.keys(event.meta.query).length > 0 && (
                <pre className="mt-1.5 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                    {JSON.stringify(event.meta.query)}
                </pre>
            )}

            {event.changes?.length > 0 && (
                <div className="mt-2">
                    <p className="mb-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Diff del objeto
                    </p>
                    <JsonDiff changes={event.changes} />
                </div>
            )}

            <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{event.note}</p>

            {event.meta?.results !== undefined && (
                <p className="mt-1 font-mono text-[10px] font-bold text-slate-400">
                    ↳ {event.meta.results} resultado(s) devuelto(s)
                </p>
            )}

            {(event.before || event.meta?.response) && (
                <details className="group mt-2">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-[10px] font-extrabold text-violet-600 transition hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-200">
                        <span className="inline-block transition group-open:rotate-90">▸</span>
                        Ver JSON {event.before ? 'antes / después' : 'de la respuesta'}
                    </summary>
                    <div className="mt-1.5 grid gap-2">
                        {event.before && <JsonBlock label="antes" value={event.before} tone="rose" />}
                        {event.after && <JsonBlock label="después" value={event.after} tone="emerald" />}
                        {!event.after && event.meta?.response && (
                            <JsonBlock label="respuesta" value={event.meta.response} tone="sky" />
                        )}
                    </div>
                </details>
            )}
        </article>
    );
}

function EmptyPanel() {
    return (
        <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 p-6 text-center dark:border-violet-400/20 dark:bg-violet-500/5">
            <div className="animate-float grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-slate-900">
                👀
            </div>
            <p className="mt-3 font-display text-sm font-extrabold text-slate-800 dark:text-slate-100">
                La consola está escuchando…
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Crea, filtra, edita o elimina algo. Cada acción aparecerá aquí con su método HTTP y su diff.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-300">
                <Sparkles className="h-3 w-3" />
                Prueba a pulsar N
            </span>
        </div>
    );
}

/**
 * Panel lateral "Rayos X": historial de operaciones con método HTTP,
 * diff JSON y explicación en lenguaje sencillo.
 */
export default function XRayPanel({ events, onClear, onClose }) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 px-4 py-3 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
                        <Eye className="h-4 w-4" />
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div>
                        <p className="font-display text-sm font-extrabold leading-tight text-slate-900 dark:text-white">
                            Consola Rayos X
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                            En vivo · {events.length} {events.length === 1 ? 'acción' : 'acciones'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={onClear}
                        disabled={events.length === 0}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800"
                        aria-label="Limpiar consola"
                        data-tip-title="Limpiar consola"
                        data-tip="Borra el historial visual de operaciones. Tus datos del inventario NO se tocan."
                    >
                        <Eraser className="h-4 w-4" />
                    </button>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            aria-label="Cerrar consola"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="scrollbar-thin flex-1 space-y-2.5 overflow-y-auto p-3">
                {events.length === 0 ? (
                    <EmptyPanel />
                ) : (
                    events.map((event, index) => (
                        <XRayEvent key={event.id} event={event} isLatest={index === 0} />
                    ))
                )}
            </div>

            <div className="border-t border-slate-200/70 p-3 dark:border-white/10">
                <p className="mb-1.5 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Métodos HTTP
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(METHOD_STYLES).map(([method, style]) => (
                        <div
                            key={method}
                            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-[10px] font-bold ${style.chip}`}
                            data-tip-title={method}
                            data-tip={style.legend}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                            {method}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
