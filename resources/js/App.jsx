import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye } from 'lucide-react';

import Confetti from './components/Confetti';
import DeleteDialog from './components/DeleteDialog';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import Hero from './components/Hero';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import ResetDialog from './components/ResetDialog';
import ShortcutsModal from './components/ShortcutsModal';
import Skeletons from './components/Skeletons';
import Toasts from './components/Toasts';
import Toolbar from './components/Toolbar';
import TooltipLayer from './components/TooltipLayer';
import XRayPanel from './components/XRayPanel';
import { getSeedItems } from './data/seed';
import { useInventory } from './hooks/useInventory';
import { useShortcuts } from './hooks/useShortcuts';
import { useTooltips } from './hooks/useTooltips';
import { STORAGE_KEYS } from './lib/constants';
import { buildQuery, diffObjects, formatTime, uid } from './lib/utils';

/* -------------------------------------------------------------------------- */
/* Preferencias de UI                                                          */
/* -------------------------------------------------------------------------- */

function readUiPreferences() {
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.ui) ?? '{}') ?? {};
    } catch {
        return {};
    }
}

function isFirstCelebration() {
    try {
        return !window.localStorage.getItem(STORAGE_KEYS.confetti);
    } catch {
        return true;
    }
}

/**
 * Componente raíz.
 *
 * Responsabilidades:
 *  1. Orquestar el estado del "servidor" (items en localStorage).
 *  2. Traducir cada acción a un evento de consola con método HTTP y diff.
 *  3. Gestionar modales, atajos globales, tema y panel Rayos X.
 */
export default function App() {
    const { items, setItems, loading, saving, resetInventory } = useInventory();

    const [theme, setTheme] = useState(() => {
        const stored = readUiPreferences();

        if (stored.tema === 'dark' || stored.tema === 'light') return stored.tema;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const [learning, setLearning] = useState(() => readUiPreferences().aprendizaje !== false);

    // Filtros y orden.
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todas');
    const [estado, setEstado] = useState('todos');
    const [sort, setSort] = useState('recientes');

    // Modales y estado efímero.
    const [modal, setModal] = useState(null); // { type: 'create' } | { type: 'edit', item }
    const [deleting, setDeleting] = useState(null);
    const [resetOpen, setResetOpen] = useState(false);
    const [shortcutsOpen, setShortcutsOpen] = useState(false);
    const [panelOpen, setPanelOpen] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [confettiBurst, setConfettiBurst] = useState(0);

    // Consola Rayos X y toasts.
    const [events, setEvents] = useState([]);
    const [toasts, setToasts] = useState([]);

    const searchRef = useRef(null);
    const filteredRef = useRef([]);
    const initialGetLogged = useRef(false);
    const filtersReadyRef = useRef(false);
    const lastFilterSignature = useRef('');
    const firstCreateRef = useRef(isFirstCelebration());

    /* ---------------------------------------------------------------------- */
    /* Derivados                                                              */
    /* ---------------------------------------------------------------------- */

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();

        const result = items.filter((item) => {
            const matchesSearch =
                !term ||
                [item.nombre, item.descripcion, item.categoria].some((value) =>
                    String(value).toLowerCase().includes(term),
                );
            const matchesCategory = category === 'Todas' || item.categoria === category;
            const matchesEstado = estado === 'todos' || item.estado === estado;

            return matchesSearch && matchesCategory && matchesEstado;
        });

        const sorters = {
            recientes: (a, b) => new Date(b.actualizadoEn) - new Date(a.actualizadoEn),
            'precio-desc': (a, b) => b.precio - a.precio,
            'precio-asc': (a, b) => a.precio - b.precio,
            'stock-asc': (a, b) => a.stock - b.stock,
            nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
        };

        return [...result].sort(sorters[sort] ?? sorters.recientes);
    }, [items, search, category, estado, sort]);

    const hasFilters = Boolean(search.trim()) || category !== 'Todas' || estado !== 'todos';

    useEffect(() => {
        filteredRef.current = filtered;
    }, [filtered]);

    /* ---------------------------------------------------------------------- */
    /* Tema y preferencias                                                    */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');

        try {
            window.localStorage.setItem(
                STORAGE_KEYS.ui,
                JSON.stringify({ tema: theme, aprendizaje: learning }),
            );
        } catch {
            /* Sin localStorage: la app sigue funcionando, solo no recuerda. */
        }
    }, [theme, learning]);

    useEffect(() => {
        if (!learning) setPanelOpen(false);
    }, [learning]);

    useEffect(() => {
        if (!panelOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [panelOpen]);

    /* ---------------------------------------------------------------------- */
    /* Consola: helpers                                                       */
    /* ---------------------------------------------------------------------- */

    const pushEvent = useCallback((event) => {
        setEvents((previous) =>
            [{ id: uid('evento'), time: formatTime(), ...event }, ...previous].slice(0, 60),
        );
    }, []);

    const clearEvents = useCallback(() => setEvents([]), []);

    const dismissToast = useCallback((id) => {
        setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, []);

    const pushToast = useCallback((type, message, emoji) => {
        const id = uid('toast');

        setToasts((previous) => [...previous.slice(-2), { id, type, message, emoji }]);
        window.setTimeout(() => {
            setToasts((previous) => previous.filter((toast) => toast.id !== id));
        }, 3800);
    }, []);

    /* ---------------------------------------------------------------------- */
    /* "GET" inicial                                                          */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        if (loading || initialGetLogged.current) return undefined;

        initialGetLogged.current = true;
        const timer = window.setTimeout(() => {
            pushEvent({
                method: 'GET',
                title: 'Cargamos el inventario al abrir la app',
                endpoint: 'GET /pociones',
                meta: {
                    results: filteredRef.current.length,
                    response: {
                        ok: true,
                        resultados: filteredRef.current.length,
                        ids: filteredRef.current.map((item) => item.id),
                    },
                },
                note: 'Al montar la app se simula una petición GET. Como no hay servidor, los datos se leen de localStorage o, la primera vez, de la semilla de fábrica.',
            });
        }, 350);

        return () => window.clearTimeout(timer);
    }, [loading, pushEvent]);

    /* ---------------------------------------------------------------------- */
    /* "GET" al filtrar (con debounce)                                        */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        if (loading) return undefined;

        const { params } = buildQuery({ search, categoria: category, estado, orden: sort });
        const signature = JSON.stringify(params);

        if (!filtersReadyRef.current) {
            filtersReadyRef.current = true;
            lastFilterSignature.current = signature;

            return undefined;
        }

        if (signature === lastFilterSignature.current) return undefined;

        const timer = window.setTimeout(() => {
            const { params: query, endpoint } = buildQuery({
                search,
                categoria: category,
                estado,
                orden: sort,
            });

            lastFilterSignature.current = signature;

            pushEvent({
                method: 'GET',
                title:
                    Object.keys(query).length > 0
                        ? 'Filtramos el inventario'
                        : 'Volvimos a leer todo el inventario',
                endpoint: `GET ${endpoint}`,
                meta: {
                    query,
                    results: filteredRef.current.length,
                    response: {
                        ok: true,
                        resultados: filteredRef.current.length,
                        ids: filteredRef.current.map((item) => item.id),
                    },
                },
                note: 'GET solo consulta: no modifica nada. Los filtros viajan como query params y el "servidor" devuelve una vista recalculada del mismo array.',
            });
        }, 550);

        return () => window.clearTimeout(timer);
    }, [search, category, estado, sort, loading, pushEvent]);

    /* ---------------------------------------------------------------------- */
    /* Acciones CRUD                                                          */
    /* ---------------------------------------------------------------------- */

    const openCreate = useCallback(() => setModal({ type: 'create' }), []);
    const openEdit = useCallback((item) => setModal({ type: 'edit', item }), []);

    const handleSave = useCallback(
        (data) => {
            if (modal?.type === 'edit' && modal.item) {
                const before = items.find((item) => item.id === modal.item.id);

                if (!before) {
                    setModal(null);
                    return;
                }

                const after = { ...before, ...data, actualizadoEn: new Date().toISOString() };
                const changes = diffObjects(before, after, { ignore: ['actualizadoEn'] });

                if (changes.length === 0) {
                    setModal(null);
                    pushToast('info', 'No cambiaste nada… ¡pero todo sigue impecable!', '🦄');
                    return;
                }

                setItems((previous) => previous.map((item) => (item.id === after.id ? after : item)));
                pushEvent({
                    method: 'PATCH',
                    title: `Actualizamos «${after.nombre}»`,
                    endpoint: `PATCH /pociones/${after.id}`,
                    changes,
                    before,
                    after,
                    note: 'PATCH actualiza solo los campos modificados del objeto. Por eso el diff muestra exactamente qué cambió y qué se mantuvo igual.',
                });
                setModal(null);
                pushToast('success', `«${after.nombre}» quedó renovado`, '✨');

                return;
            }

            const item = {
                id: uid('pocion'),
                actualizadoEn: new Date().toISOString(),
                ...data,
            };

            setItems((previous) => [item, ...previous]);
            pushEvent({
                method: 'POST',
                title: `Creamos «${item.nombre}»`,
                endpoint: 'POST /pociones',
                changes: diffObjects({}, item, { ignore: ['actualizadoEn'] }),
                before: null,
                after: item,
                note: 'POST crea un recurso nuevo. El "servidor" genera un id único, marca la fecha y añade el objeto al principio del array.',
            });
            setModal(null);

            if (firstCreateRef.current) {
                firstCreateRef.current = false;

                try {
                    window.localStorage.setItem(STORAGE_KEYS.confetti, '1');
                } catch {
                    /* sin persistencia, pero el confeti igual ocurre */
                }

                setConfettiBurst((burst) => burst + 1);
                pushToast('magic', `¡Primer objeto creado! «${item.nombre}» ya está en el inventario.`, '🎉');
            } else {
                pushToast('success', `«${item.nombre}» acaba de aterrizar en el inventario`, '🧪');
            }
        },
        [items, modal, pushEvent, pushToast, setItems],
    );

    const handleDeleteConfirm = useCallback(() => {
        const target = deleting;

        if (!target) return;

        setDeleting(null);
        setRemovingId(target.id);

        // Esperamos la animación de salida antes de mutar el array.
        window.setTimeout(() => {
            setItems((previous) => previous.filter((item) => item.id !== target.id));
            pushEvent({
                method: 'DELETE',
                title: `Desintegramos «${target.nombre}»`,
                endpoint: `DELETE /pociones/${target.id}`,
                changes: diffObjects(target, {}, { ignore: ['actualizadoEn'] }),
                before: target,
                after: null,
                note: 'DELETE elimina el recurso identificado por su id. Después de la operación, el objeto ya no existe ni en el array ni en localStorage.',
            });
            pushToast('danger', `«${target.nombre}» se desvaneció en una nube de humo`, '💨');
            setRemovingId(null);
        }, 240);
    }, [deleting, pushEvent, pushToast, setItems]);

    const handleStockDelta = useCallback(
        (item, delta) => {
            const stock = Math.max(0, item.stock + delta);

            if (stock === item.stock) return;

            let nextEstado = item.estado;

            if (stock === 0) nextEstado = 'agotado';
            else if (item.estado === 'agotado') nextEstado = 'disponible';

            const after = {
                ...item,
                stock,
                estado: nextEstado,
                actualizadoEn: new Date().toISOString(),
            };

            setItems((previous) => previous.map((current) => (current.id === item.id ? after : current)));
            pushEvent({
                method: 'PATCH',
                title: `Ajuste rápido de stock en «${item.nombre}»`,
                endpoint: `PATCH /pociones/${item.id}`,
                changes: diffObjects(item, after, { ignore: ['actualizadoEn'] }),
                before: item,
                after,
                note: 'Un PATCH parcial: la UI solo envía stock (y estado si la regla de negocio lo cambió). No se reemplaza el objeto completo.',
            });

            if (stock === 0) {
                pushToast('info', `«${item.nombre}» se quedó sin stock. Su estado pasó a Agotado.`, '📉');
            }
        },
        [pushEvent, pushToast, setItems],
    );

    const handleResetConfirm = useCallback(() => {
        const before = items;

        resetInventory();
        setResetOpen(false);
        setSearch('');
        setCategory('Todas');
        setEstado('todos');
        setSort('recientes');

        pushEvent({
            method: 'DELETE',
            title: 'Reiniciamos el inventario de fábrica',
            endpoint: 'DELETE /inventario?seed=1',
            changes: [],
            before,
            after: getSeedItems(),
            note: 'El reinicio vacía el almacenamiento actual y vuelve a cargar la semilla de 6 objetos. Es la excepción perfecta para experimentar sin miedo.',
        });
        pushToast('magic', '¡Datos de fábrica restaurados! 6 reliquias listas.', '🧹');
    }, [items, pushEvent, pushToast, resetInventory]);

    /* ---------------------------------------------------------------------- */
    /* Atajos y cierre global                                                 */
    /* ---------------------------------------------------------------------- */

    const handleEscape = useCallback(() => {
        if (deleting) return setDeleting(null);
        if (resetOpen) return setResetOpen(false);
        if (shortcutsOpen) return setShortcutsOpen(false);
        if (modal) return setModal(null);
        if (panelOpen) setPanelOpen(false);

        return undefined;
    }, [deleting, modal, panelOpen, resetOpen, shortcutsOpen]);

    useShortcuts({
        onNew: () => {
            if (!modal && !deleting && !resetOpen && !shortcutsOpen) setModal({ type: 'create' });
        },
        onSearch: () => {
            if (!modal && !deleting && !resetOpen && !shortcutsOpen) searchRef.current?.focus();
        },
        onHelp: () => {
            if (!modal && !deleting && !resetOpen) setShortcutsOpen(true);
        },
        onEscape: handleEscape,
        onTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
        onLearning: () => setLearning((current) => !current),
    });

    const clearFilters = useCallback(() => {
        setSearch('');
        setCategory('Todas');
        setEstado('todos');
        setSort('recientes');
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
    }, []);

    // Tooltips globales: solo se activan con el Modo Aprendizaje.
    const tip = useTooltips(learning);

    /* ---------------------------------------------------------------------- */
    /* Render                                                                 */
    /* ---------------------------------------------------------------------- */

    return (
        <div className="relative min-h-screen overflow-x-clip">
            {/* Fondo decorativo */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#faf7ff] via-[#f5f1ff] to-[#eef6ff] dark:from-[#0a0e1c] dark:via-[#0d1226] dark:to-[#0a1020]"
            >
                <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/15" />
                <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/10" />
                <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
                <span className="animate-sparkle absolute left-[8%] top-[22%] text-xl text-violet-400/60">✦</span>
                <span className="animate-sparkle absolute right-[12%] top-[15%] text-sm text-fuchsia-400/60" style={{ animationDelay: '1.3s' }}>
                    ✧
                </span>
                <span className="animate-sparkle absolute bottom-[18%] left-[18%] text-sm text-sky-400/60" style={{ animationDelay: '2.1s' }}>
                    ✦
                </span>
            </div>

            <Header
                theme={theme}
                onToggleTheme={toggleTheme}
                learning={learning}
                onToggleLearning={() => setLearning((current) => !current)}
                saving={saving}
                eventsCount={events.length}
                onOpenShortcuts={() => setShortcutsOpen(true)}
                onOpenPanel={() => setPanelOpen(true)}
            />

            <main className="mx-auto max-w-[1600px] px-3 pb-24 pt-5 sm:px-5 sm:pt-6">
                <div className={`grid gap-5 ${learning ? 'xl:grid-cols-[minmax(0,1fr)_370px] 2xl:grid-cols-[minmax(0,1fr)_390px]' : ''}`}>
                    <div className="min-w-0 space-y-5">
                        <Hero
                            items={items}
                            estado={estado}
                            onFilterEstado={(id) => setEstado(id)}
                            loading={loading}
                        />

                        <Toolbar
                            search={search}
                            onSearchChange={setSearch}
                            searchRef={searchRef}
                            category={category}
                            onCategoryChange={setCategory}
                            estado={estado}
                            onEstadoChange={setEstado}
                            sort={sort}
                            onSortChange={setSort}
                            onNew={openCreate}
                            onReset={() => setResetOpen(true)}
                            onClearFilters={clearFilters}
                            hasFilters={hasFilters}
                            items={items}
                            results={filtered.length}
                        />

                        {loading ? (
                            <Skeletons />
                        ) : filtered.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                                {filtered.map((item, index) => (
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        removing={removingId === item.id}
                                        onEdit={openEdit}
                                        onDelete={setDeleting}
                                        onStockDelta={handleStockDelta}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                hasFilters={hasFilters}
                                onClearFilters={clearFilters}
                                onNew={openCreate}
                            />
                        )}

                        <footer className="pt-1 text-center text-[11px] font-semibold leading-relaxed text-slate-400">
                            Hecho con <span className="text-violet-500 dark:text-violet-300">React + Vite + Tailwind CSS</span> sobre
                            Laravel 12 · Sin base de datos: todo vive en tu navegador.
                        </footer>
                    </div>

                    {learning && (
                        <aside className="hidden xl:block">
                            <div className="sticky top-[84px] h-[calc(100vh-6.5rem)] overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-xl shadow-violet-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
                                <XRayPanel events={events} onClear={clearEvents} />
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            {/* Botón flotante para abrir la consola en pantallas pequeñas */}
            {learning && (
                <button
                    type="button"
                    onClick={() => setPanelOpen(true)}
                    className="fixed bottom-5 right-4 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-xs font-extrabold text-white shadow-xl shadow-violet-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 xl:hidden"
                    aria-label="Abrir consola Rayos X"
                    data-tip-title="Consola Rayos X"
                    data-tip="En pantallas pequeñas la consola se abre como panel lateral. Ahí ves el método HTTP y el diff de cada acción."
                >
                    <Eye className="h-4 w-4" />
                    Rayos X
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/25 px-1 text-[10px] font-black">
                        {events.length}
                    </span>
                </button>
            )}

            {/* Consola móvil */}
            {learning && panelOpen && (
                <div className="fixed inset-0 z-40 xl:hidden">
                    <button
                        type="button"
                        aria-label="Cerrar consola"
                        onClick={() => setPanelOpen(false)}
                        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/40 backdrop-blur-sm animate-fade-in"
                    />
                    <div className="animate-drawer-in absolute right-0 top-0 h-full w-full max-w-sm border-l border-white/60 bg-white/95 shadow-2xl shadow-slate-950/30 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
                        <XRayPanel events={events} onClear={clearEvents} onClose={() => setPanelOpen(false)} />
                    </div>
                </div>
            )}

            {modal && (
                <ItemModal
                    key={modal.type === 'edit' ? modal.item.id : 'crear'}
                    item={modal.type === 'edit' ? modal.item : null}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                />
            )}

            {deleting && (
                <DeleteDialog
                    item={deleting}
                    onCancel={() => setDeleting(null)}
                    onConfirm={handleDeleteConfirm}
                />
            )}

            {resetOpen && (
                <ResetDialog onCancel={() => setResetOpen(false)} onConfirm={handleResetConfirm} />
            )}

            {shortcutsOpen && <ShortcutsModal onClose={() => setShortcutsOpen(false)} />}

            <Toasts toasts={toasts} onDismiss={dismissToast} />
            <Confetti burst={confettiBurst} />
            <TooltipLayer tip={tip} />
        </div>
    );
}
