import {
    CheckCircle2,
    CloudUpload,
    Eye,
    FlaskConical,
    Keyboard,
    Loader2,
    Moon,
    Sun,
} from 'lucide-react';

const ICON_BUTTON =
    'grid h-10 w-10 place-items-center rounded-xl border border-white/70 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-600 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-violet-400/40 dark:hover:text-violet-300';

export default function Header({
    theme,
    onToggleTheme,
    learning,
    onToggleLearning,
    saving,
    eventsCount,
    onOpenShortcuts,
    onOpenPanel,
}) {
    return (
        <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/60">
            <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="animate-float-slow relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 text-white shadow-lg shadow-violet-500/30">
                        <FlaskConical className="h-6 w-6" strokeWidth={2.2} />
                        <span className="absolute -right-1.5 -top-1.5 text-sm">✨</span>
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-display text-lg font-extrabold leading-5 tracking-tight text-slate-900 dark:text-white">
                            Poción &amp; Co.
                        </p>
                        <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-500 dark:text-violet-300">
                            Laboratorio CRUD
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                        className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-extrabold md:flex ${
                            saving
                                ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200'
                                : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200'
                        }`}
                        data-tip-title="Persistencia en localStorage"
                        data-tip="Tus cambios se guardan en el navegador con 300 ms de retraso simulado. Si ves «Guardando…», la escritura está en camino."
                    >
                        {saving ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        {saving ? 'Guardando…' : 'Guardado local'}
                    </div>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={learning}
                        aria-label="Modo Aprendizaje (Rayos X)"
                        onClick={onToggleLearning}
                        className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition sm:px-2.5 ${
                            learning
                                ? 'border-violet-300 bg-violet-50 text-violet-700 shadow-sm shadow-violet-500/20 dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-200'
                                : 'border-slate-200 bg-white/70 text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400'
                        }`}
                        data-tip-title="Modo Aprendizaje (Rayos X)"
                        data-tip="Actívalo para ver tooltips explicativos en cada control y la consola que traduce tus acciones a peticiones HTTP reales."
                    >
                        <span
                            className={`relative flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                                learning
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                                    : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                        >
                            <span
                                className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                                    learning ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </span>
                        <Eye className={`hidden h-4 w-4 sm:block ${learning ? '' : 'opacity-60'}`} />
                        <span className="hidden text-xs font-extrabold lg:inline">Modo Aprendizaje</span>
                        <span className="hidden text-xs font-extrabold xl:inline">(Rayos X)</span>
                        <span className="text-xs font-extrabold sm:hidden">Rayos X</span>
                    </button>

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className={ICON_BUTTON}
                        aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        data-tip-title="Tema claro / oscuro"
                        data-tip="Cambia la apariencia de toda la app. Tu preferencia se guarda en localStorage, así que se recuerda al volver."
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <button
                        type="button"
                        onClick={onOpenShortcuts}
                        className={`${ICON_BUTTON} hidden sm:grid`}
                        aria-label="Ver atajos de teclado"
                        data-tip-title="Atajos de teclado"
                        data-tip="Abre la guía visual de atajos: N para crear, / para buscar, Esc para cerrar y más."
                    >
                        <Keyboard className="h-5 w-5" />
                    </button>

                    {learning && (
                        <button
                            type="button"
                            onClick={onOpenPanel}
                            className="relative grid h-10 w-10 place-items-center rounded-xl border border-violet-200 bg-violet-50 text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200 xl:hidden"
                            aria-label="Abrir consola Rayos X"
                            data-tip-title="Consola Rayos X"
                            data-tip="Abre el panel en vivo donde ves el método HTTP, el diff JSON y la explicación de cada acción."
                        >
                            <CloudUpload className="h-5 w-5" />
                            {eventsCount > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-black text-white shadow">
                                    {eventsCount > 9 ? '9+' : eventsCount}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
