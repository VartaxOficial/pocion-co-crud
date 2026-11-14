import { Trash2, X } from 'lucide-react';

import Modal from './Modal';
import { METHOD_STYLES } from '../lib/constants';

const style = METHOD_STYLES.DELETE;

export default function DeleteDialog({ item, onCancel, onConfirm }) {
    return (
        <Modal onClose={onCancel} labelledBy="titulo-eliminar" size="sm">
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-3xl dark:bg-rose-500/15">
                        {item.emoji}
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        aria-label="Cancelar eliminación"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <h2 id="titulo-eliminar" className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-white">
                    ¿Desintegrar «{item.nombre}»?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Desaparecerá del array y de <code className="font-mono text-[12px] font-bold">localStorage</code>. No hay
                    Ctrl + Z, pero siempre puedes usar <strong>Reiniciar datos de fábrica</strong>.
                </p>

                <pre className="mt-4 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
{`DELETE /pociones/${item.id}`}
                </pre>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200/70 bg-rose-50/70 p-3 text-[11px] font-bold text-rose-600 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300">
                    <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-black ${style.chip}`}>DELETE</span>
                    Eliminar es irreversible dentro de la sesión actual.
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        data-tip="Cierra el diálogo sin eliminar nada. También puedes pulsar Esc."
                    >
                        Mejor no
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-rose-500/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                        data-tip-title="Confirmar DELETE"
                        data-tip="Envía la operación DELETE, la tarjeta se desvanece con una animación y el objeto deja de existir en el JSON."
                    >
                        <Trash2 className="h-4 w-4" />
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
