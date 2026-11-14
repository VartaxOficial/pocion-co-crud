import { Boxes, PackageOpen, Sparkles, Wand2 } from 'lucide-react';

import { METHOD_STYLES } from '../lib/constants';

const CRUD_LEGEND = [
    { method: 'POST', letter: 'C', label: 'Crear' },
    { method: 'GET', letter: 'R', label: 'Leer' },
    { method: 'PATCH', letter: 'U', label: 'Actualizar' },
    { method: 'DELETE', letter: 'D', label: 'Eliminar' },
];

const STATS = [
    {
        id: 'todos',
        label: 'Reliquias',
        emoji: '📦',
        icon: Boxes,
        tone: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
        active: 'ring-violet-400/70 border-violet-300 bg-violet-50/80 dark:border-violet-400/40 dark:bg-violet-500/10',
    },
    {
        id: 'disponible',
        label: 'Disponibles',
        emoji: '✅',
        icon: Sparkles,
        tone: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
        active: 'ring-emerald-400/70 border-emerald-300 bg-emerald-50/80 dark:border-emerald-400/40 dark:bg-emerald-500/10',
    },
    {
        id: 'pocas',
        label: 'Pocas',
        emoji: '🔥',
        icon: PackageOpen,
        tone: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
        active: 'ring-amber-400/70 border-amber-300 bg-amber-50/80 dark:border-amber-400/40 dark:bg-amber-500/10',
    },
    {
        id: 'agotado',
        label: 'Agotadas',
        emoji: '🚫',
        icon: Wand2,
        tone: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
        active: 'ring-rose-400/70 border-rose-300 bg-rose-50/80 dark:border-rose-400/40 dark:bg-rose-500/10',
    },
];

export default function Hero({ items, estado, onFilterEstado, loading }) {
    const countByEstado = (id) => (id === 'todos' ? items.length : items.filter((item) => item.estado === id).length);

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-xl shadow-violet-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/20" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
            <span className="animate-sparkle pointer-events-none absolute right-8 top-6 text-2xl text-violet-400">✦</span>
            <span className="animate-sparkle pointer-events-none absolute right-24 top-16 text-sm text-fuchsia-400" style={{ animationDelay: '1.2s' }}>
                ✧
            </span>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
                        <Sparkles className="h-3.5 w-3.5" />
                        Inventario mágico · CRUD educativo
                    </span>

                    <h1 className="mt-3 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Tu inventario mágico{' '}
                        <span className="animate-wiggle inline-block">🪄</span>
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[15px]">
                        Gestiona pociones, artefactos y criaturas mientras descubres el HTTP que se esconde
                        detrás de cada clic. Sin base de datos: todo vive en tu{' '}
                        <code className="rounded-md bg-slate-900 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 dark:bg-slate-800">
                            localStorage
                        </code>
                        .
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {CRUD_LEGEND.map((entry) => {
                            const style = METHOD_STYLES[entry.method];

                            return (
                                <span
                                    key={entry.method}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${style.chip}`}
                                    data-tip-title={`${entry.method} · ${entry.label}`}
                                    data-tip={`${style.legend} Las letras C-R-U-D forman las cuatro operaciones básicas de cualquier aplicación de datos.`}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                                    {entry.letter} · {entry.label}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[430px]">
                    {STATS.map((stat) => {
                        const Icon = stat.icon;
                        const active = estado === stat.id;

                        return (
                            <button
                                key={stat.id}
                                type="button"
                                onClick={() => onFilterEstado(stat.id)}
                                aria-pressed={active}
                                data-tip-title={`Filtro: ${stat.label}`}
                                data-tip={`Este contador se calcula a partir del estado. Al pulsarlo aplicas un filtro GET y la consola te muestra la query resultante.`}
                                className={`group rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                                    active
                                        ? `ring-2 ${stat.active}`
                                        : 'border-white/80 bg-white/60 dark:border-white/10 dark:bg-slate-950/30'
                                }`}
                            >
                                <div className={`mb-2 grid h-8 w-8 place-items-center rounded-xl ${stat.tone}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <p className="font-display text-2xl font-extrabold leading-none text-slate-900 dark:text-white">
                                    {loading ? '·' : countByEstado(stat.id)}
                                </p>
                                <p className="mt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                    {stat.emoji} {stat.label}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
