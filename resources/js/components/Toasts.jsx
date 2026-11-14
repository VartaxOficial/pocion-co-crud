import { CheckCircle2, Sparkles, TriangleAlert, X } from 'lucide-react';

const TYPES = {
    success: {
        icon: CheckCircle2,
        ring: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
        bar: 'bg-emerald-400',
        border: 'border-emerald-200/80 dark:border-emerald-400/20',
        title: 'Hecho',
    },
    danger: {
        icon: TriangleAlert,
        ring: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
        bar: 'bg-rose-400',
        border: 'border-rose-200/80 dark:border-rose-400/20',
        title: 'Eliminado',
    },
    info: {
        icon: Sparkles,
        ring: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
        bar: 'bg-sky-400',
        border: 'border-sky-200/80 dark:border-sky-400/20',
        title: 'Aviso',
    },
    magic: {
        icon: Sparkles,
        ring: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
        bar: 'bg-violet-400',
        border: 'border-violet-200/80 dark:border-violet-400/20',
        title: 'Magia',
    },
};

export default function Toasts({ toasts, onDismiss }) {
    return (
        <div className="pointer-events-none fixed bottom-20 left-1/2 z-[70] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-3 sm:bottom-5 sm:left-auto sm:right-5 sm:translate-x-0">
            {toasts.map((toast) => {
                const type = TYPES[toast.type] ?? TYPES.info;
                const Icon = type.icon;

                return (
                    <div
                        key={toast.id}
                        role="status"
                        className={`animate-toast-in pointer-events-auto relative overflow-hidden rounded-2xl border ${type.border} bg-white/95 p-3 pr-9 shadow-xl shadow-slate-950/10 backdrop-blur dark:bg-slate-900/95`}
                    >
                        <div className="flex items-start gap-2.5">
                            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-lg ${type.ring}`}>
                                {toast.emoji || <Icon className="h-4 w-4" />}
                            </div>
                            <div className="min-w-0 pt-0.5">
                                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{type.title}</p>
                                <p className="text-xs font-bold leading-snug text-slate-700 dark:text-slate-200">{toast.message}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onDismiss(toast.id)}
                            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            aria-label="Cerrar aviso"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>

                        <span className={`animate-toast-progress absolute bottom-0 left-0 h-0.5 ${type.bar}`} />
                    </div>
                );
            })}
        </div>
    );
}
