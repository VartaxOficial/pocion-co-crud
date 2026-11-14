import { Keyboard, X } from 'lucide-react';

import Modal from './Modal';

const SHORTCUTS = [
    { keys: ['N'], title: 'Nuevo objeto', description: 'Abre el formulario de creación.' },
    { keys: ['/'], title: 'Buscar', description: 'Enfoca la barra de búsqueda.' },
    { keys: ['Ctrl', 'K'], title: 'Buscar (alternativa)', description: 'Funciona también con ⌘ en Mac.' },
    { keys: ['Esc'], title: 'Cerrar / cancelar', description: 'Cierra modales y paneles abiertos.' },
    { keys: ['?'], title: 'Esta guía', description: 'Muestra u oculta los atajos.' },
    { keys: ['D'], title: 'Cambiar tema', description: 'Alterna claro / oscuro.' },
    { keys: ['M'], title: 'Modo aprendizaje', description: 'Activa o desactiva los Rayos X.' },
    { keys: ['Ctrl', 'Enter'], title: 'Guardar formulario', description: 'Envía el POST o PATCH si es válido.' },
];

export default function ShortcutsModal({ onClose }) {
    return (
        <Modal onClose={onClose} labelledBy="titulo-atajos" size="sm">
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
                        <Keyboard className="h-6 w-6" />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        aria-label="Cerrar guía de atajos"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <h2 id="titulo-atajos" className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-white">
                    Atajos de teclado
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Para moverte a la velocidad de un mago. Se pausan mientras escribes en un campo.
                </p>

                <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {SHORTCUTS.map((shortcut) => (
                        <div
                            key={shortcut.title}
                            className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-2.5 dark:border-slate-700/80 dark:bg-slate-900/50"
                        >
                            <div className="flex shrink-0 items-center gap-1">
                                {shortcut.keys.map((key) => (
                                    <kbd
                                        key={key}
                                        className="inline-flex min-w-6 items-center justify-center rounded-md border border-slate-200 bg-white px-1.5 py-1 font-mono text-[10px] font-bold text-slate-600 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                                    >
                                        {key}
                                    </kbd>
                                ))}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-extrabold leading-tight text-slate-700 dark:text-slate-200">
                                    {shortcut.title}
                                </p>
                                <p className="text-[10px] leading-snug text-slate-400">{shortcut.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 rounded-xl border border-violet-200/70 bg-violet-50/60 p-3 text-[11px] font-semibold leading-relaxed text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                    💡 Consejo: pulsa <kbd className="rounded border border-current/20 bg-white/60 px-1 font-mono text-[10px]">N</kbd>{' '}
                    y luego <kbd className="rounded border border-current/20 bg-white/60 px-1 font-mono text-[10px]">Ctrl + Enter</kbd>{' '}
                    para crear un objeto sin tocar el ratón. La consola registrará el POST al instante.
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                    Entendido
                </button>
            </div>
        </Modal>
    );
}
