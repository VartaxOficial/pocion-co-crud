import { ArrowUpDown, Filter, Plus, RotateCcw, Search, X } from 'lucide-react';

import { CATEGORIES, ESTADOS, INPUT_CLASS, SORT_OPTIONS } from '../lib/constants';

const SELECT_CLASS = `${INPUT_CLASS} cursor-pointer appearance-none py-2 pl-9 pr-8`;

export default function Toolbar({
    search,
    onSearchChange,
    searchRef,
    category,
    onCategoryChange,
    estado,
    onEstadoChange,
    sort,
    onSortChange,
    onNew,
    onReset,
    onClearFilters,
    hasFilters,
    items,
    results,
}) {
    const countFor = (id) => items.filter((item) => item.categoria === id).length;

    return (
        <section
            className="sticky top-[76px] z-20 rounded-3xl border border-white/70 bg-white/80 p-3 shadow-lg shadow-violet-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:p-4"
            data-tip-title="Barra de herramientas"
            data-tip="Aquí viven la búsqueda, los filtros y las acciones principales. Cada control dispara una operación distinta: GET al filtrar, POST al crear."
        >
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
                <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <label htmlFor="buscador" className="sr-only">
                        Buscar en el inventario
                    </label>
                    <input
                        id="buscador"
                        ref={searchRef}
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Busca por nombre, descripción o categoría…"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-24 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500"
                        data-tip-title="Búsqueda instantánea (GET)"
                        data-tip="Filtra en tiempo real por nombre, descripción o categoría. Internamente se genera un GET /pociones?search=… que puedes ver en la consola Rayos X."
                    />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                        {search && (
                            <button
                                type="button"
                                onClick={() => onSearchChange('')}
                                className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                aria-label="Limpiar búsqueda"
                                data-tip="Limpia el texto de búsqueda y vuelve a mostrar todo el inventario."
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <kbd className="hidden rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-800 sm:block">
                            /
                        </kbd>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onNew}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0 lg:flex-none"
                        data-tip-title="Crear un objeto (POST)"
                        data-tip="Abre el formulario de creación. Al guardar se enviará un POST, se añadirá un id único y el objeto aparecerá en el array y en localStorage."
                    >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Nuevo objeto
                        <kbd className="rounded-md bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-bold">N</kbd>
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:text-rose-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:border-rose-400/40 dark:hover:text-rose-300"
                        aria-label="Reiniciar datos de fábrica"
                        data-tip-title="Reiniciar datos de fábrica"
                        data-tip="Restaura los 6 objetos originales y borra los cambios que hayas hecho. Es un DELETE del almacenamiento seguido de una recarga de la semilla."
                    >
                        <RotateCcw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <div className="scrollbar-thin flex max-w-full items-center gap-1.5 overflow-x-auto pb-0.5">
                    <button
                        type="button"
                        onClick={() => onCategoryChange('Todas')}
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition ${
                            category === 'Todas'
                                ? 'border-transparent bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                                : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300'
                        }`}
                        data-tip-title="Categoría: Todas"
                        data-tip="Quita el filtro de categoría. Equivale a no enviar el parámetro categoria en el GET."
                    >
                        ✨ Todas
                        <span className="ml-1 opacity-60">{items.length}</span>
                    </button>

                    {CATEGORIES.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onCategoryChange(item.id)}
                            className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition ${
                                category === item.id
                                    ? 'border-transparent bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300'
                            }`}
                            data-tip-title={`Categoría: ${item.id}`}
                            data-tip={`Filtra el inventario por ${item.id}. El estado se guarda en la query (?categoria=${item.id}) y la lista se recalcula sin modificar los datos.`}
                        >
                            {item.emoji} {item.id}
                            <span className="ml-1 opacity-60">{countFor(item.id)}</span>
                        </button>
                    ))}
                </div>

                <div className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

                <div className="relative">
                    <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <label htmlFor="filtro-estado" className="sr-only">
                        Filtrar por estado
                    </label>
                    <select
                        id="filtro-estado"
                        value={estado}
                        onChange={(event) => onEstadoChange(event.target.value)}
                        className={SELECT_CLASS}
                        data-tip-title="Filtro por estado (GET)"
                        data-tip="Muestra solo los objetos disponibles, con pocas unidades o agotados. Es otro parámetro de la misma petición GET."
                    >
                        <option value="todos">Todos los estados</option>
                        {ESTADOS.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.emoji} {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <label htmlFor="orden" className="sr-only">
                        Ordenar resultados
                    </label>
                    <select
                        id="orden"
                        value={sort}
                        onChange={(event) => onSortChange(event.target.value)}
                        className={SELECT_CLASS}
                        data-tip-title="Ordenar resultados"
                        data-tip="Reordena la vista sin tocar los datos. En una API real el orden viajaría como ?orden=precio-asc."
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <span
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-extrabold text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                    data-tip-title="Resultados visibles"
                    data-tip="Muestra cuántos objetos cumplen los filtros actuales frente al total. Los datos originales no se han tocado."
                >
                    {results} de {items.length}
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={onClearFilters}
                            className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold text-violet-600 shadow-sm transition hover:bg-violet-50 dark:bg-slate-900 dark:text-violet-300"
                            data-tip="Borra búsqueda, categoría, estado y orden de golpe."
                        >
                            <X className="h-3 w-3" />
                            Limpiar
                        </button>
                    )}
                </span>
            </div>
        </section>
    );
}
