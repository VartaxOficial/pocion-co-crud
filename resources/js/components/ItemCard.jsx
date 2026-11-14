import { Minus, Pencil, Plus, Trash2 } from 'lucide-react';

import { CATEGORY_MAP, ESTADO_MAP, MAX_STOCK } from '../lib/constants';
import { formatPrice } from '../lib/utils';

const ACTION_BUTTON =
    'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[11px] font-extrabold transition active:scale-95';

export default function ItemCard({ item, index, removing, onEdit, onDelete, onStockDelta }) {
    const category = CATEGORY_MAP[item.categoria] ?? CATEGORY_MAP.Pociones;
    const estado = ESTADO_MAP[item.estado] ?? ESTADO_MAP.disponible;
    const stockPercent = Math.min(100, Math.round((item.stock / MAX_STOCK) * 100));

    return (
        <article
            data-testid="item-card"
            data-item-id={item.id}
            className={`group relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-lg shadow-violet-500/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-slate-900/65 ${
                removing ? 'animate-card-out' : 'animate-card-in'
            }`}
            style={{ animationDelay: removing ? '0ms' : `${Math.min(index, 8) * 45}ms` }}
        >
            <div className={`absolute inset-x-0 top-0 h-1.5 ${category.accent}`} />
            <div
                className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${category.glow} blur-2xl transition-transform duration-500 group-hover:scale-125`}
            />

            <div className="relative p-4 sm:p-5">
                <div className="flex items-start gap-3">
                    <div
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-3xl shadow-sm ${category.chip}`}
                        data-tip-title="Ícono del objeto"
                        data-tip="Es un emoji guardado como texto dentro del JSON. Puedes cambiarlo al editar; no es una imagen ni ocupa un archivo aparte."
                    >
                        {item.emoji}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="truncate font-display text-lg font-extrabold leading-tight text-slate-900 dark:text-white">
                                    {item.nombre}
                                </h3>
                                <span className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${category.chip}`}>
                                    {category.emoji} {item.categoria}
                                </span>
                            </div>

                            <span
                                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-extrabold ${estado.badge}`}
                                data-tip-title="Estado del objeto"
                                data-tip="El estado es un campo más del JSON. El filtro por estado lo usa para decidir qué tarjetas mostrar."
                            >
                                {estado.emoji} {estado.label}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.descripcion}
                </p>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Precio</p>
                        <p className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                            {formatPrice(item.precio)}{' '}
                            <span className="text-xs font-bold text-amber-500" title="monedas de oro">
                                🪙
                            </span>
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Stock</p>
                        <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                            {item.stock} <span className="text-[10px] font-bold text-slate-400">uds.</span>
                        </p>
                        <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${estado.dot}`}
                                style={{ width: `${stockPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                <p className="mt-2 truncate font-mono text-[10px] text-slate-400 dark:text-slate-500" data-tip-title="Identificador único">
                    #{item.id} · actualizado {new Date(item.actualizadoEn).toLocaleDateString('es-ES')}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/70 pt-3 dark:border-white/10">
                    <div
                        className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50/80 p-0.5 dark:border-slate-700 dark:bg-slate-950/40"
                        data-tip-title="Ajuste rápido de stock (PATCH)"
                        data-tip="Los botones − y + envían un PATCH parcial: solo cambian el stock. Si llega a 0, el estado pasa automáticamente a Agotado."
                    >
                        <button
                            type="button"
                            onClick={() => onStockDelta(item, -1)}
                            disabled={item.stock === 0}
                            className="grid h-7 w-7 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-rose-600 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-slate-800"
                            aria-label={`Quitar una unidad de ${item.nombre}`}
                        >
                            <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-slate-700 dark:text-slate-200">{item.stock}</span>
                        <button
                            type="button"
                            onClick={() => onStockDelta(item, 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-emerald-600 hover:shadow-sm dark:hover:bg-slate-800"
                            aria-label={`Añadir una unidad de ${item.nombre}`}
                        >
                            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className={`${ACTION_BUTTON} border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200 dark:hover:bg-violet-500/20`}
                            data-tip-title="Editar objeto (PATCH)"
                            data-tip="Abre el mismo formulario en modo edición. Al guardar solo se aplican los campos que cambiaron: eso es un PATCH."
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Editar</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className={`${ACTION_BUTTON} border-rose-200 bg-rose-50 px-2 text-rose-600 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20`}
                            aria-label={`Eliminar ${item.nombre}`}
                            data-tip-title="Eliminar objeto (DELETE)"
                            data-tip="Pide confirmación y después elimina el objeto por su id. La tarjeta se desvanece con una animación antes de desaparecer del array."
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
