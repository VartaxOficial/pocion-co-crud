import { Plus, Sparkles, X } from 'lucide-react';

export default function EmptyState({ hasFilters, onClearFilters, onNew }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-violet-200 bg-white/60 px-6 py-14 text-center backdrop-blur dark:border-violet-400/20 dark:bg-slate-900/40">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-400/20 blur-3xl" />
            <div className="relative">
                <div className="animate-float mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 text-5xl">
                    🔮
                </div>
                <h2 className="mt-5 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                    {hasFilters ? 'La bola de cristal no ve nada…' : 'Tu inventario está vacío'}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {hasFilters
                        ? 'Ningún objeto cumple los filtros actuales. Prueba a limpiarlos o a buscar otra palabra mágica.'
                        : 'No queda ni una reliquia. Crea tu primer objeto y mira cómo la consola Rayos X registra el POST.'}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={onClearFilters}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                            data-tip-title="Limpiar filtros (GET)"
                            data-tip="Restablece búsqueda, categoría, estado y orden. La lista vuelve a mostrar todos los objetos."
                        >
                            <X className="h-4 w-4" />
                            Limpiar filtros
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onNew}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                        data-tip-title="Crear el primero (POST)"
                        data-tip="Rellena el formulario y guarda. Verás un POST en la consola y, si es tu primer objeto, una lluvia de confeti."
                    >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Crear el primero
                    </button>
                </div>
                <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-violet-500 dark:text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Pista: pulsa la tecla N en cualquier momento
                </p>
            </div>
        </div>
    );
}
