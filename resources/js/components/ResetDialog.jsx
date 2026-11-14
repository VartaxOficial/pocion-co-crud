import { RotateCcw, X } from 'lucide-react';

import Modal from './Modal';
import { METHOD_STYLES } from '../lib/constants';

const style = METHOD_STYLES.DELETE;

export default function ResetDialog({ onCancel, onConfirm }) {
    return (
        <Modal onClose={onCancel} labelledBy="titulo-reiniciar" size="sm">
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-3xl dark:bg-violet-500/15">
                        🧹
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        aria-label="Cancelar reinicio"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <h2 id="titulo-reiniciar" className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-white">
                    ¿Volver a los datos de fábrica?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Se restauran los <strong>6 objetos originales</strong> y se borran los cambios de esta sesión. La consola
                    Rayos X conserva su historial para que puedas comparar.
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-violet-200/70 bg-violet-50/70 p-3 text-[11px] font-bold text-violet-600 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
                    <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-black ${style.chip}`}>DELETE</span>
                    Se vacía el almacenamiento y se vuelve a cargar la semilla.
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        data-tip="Cierra sin tocar tus datos actuales."
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                        data-tip-title="Reiniciar (DELETE + semilla)"
                        data-tip="Borra el almacenamiento local y recrea los 6 objetos de la semilla. Es la forma más rápida de empezar de cero."
                    >
                        <RotateCcw className="h-4 w-4" />
                        Sí, reiniciar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
