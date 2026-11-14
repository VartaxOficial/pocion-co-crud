/**
 * Esqueletos de carga: imitan la forma de las tarjetas reales para que el
 * cambio de estado no produzca saltos bruscos (CLS) cuando llegan los datos.
 */
export default function Skeletons({ count = 6 }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/50"
                >
                    <div className="flex items-start gap-3">
                        <div className="skeleton h-14 w-14 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                            <div className="skeleton h-4 w-3/4 rounded-full" />
                            <div className="skeleton h-3 w-1/3 rounded-full" />
                        </div>
                        <div className="skeleton h-5 w-16 rounded-full" />
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="skeleton h-3 w-full rounded-full" />
                        <div className="skeleton h-3 w-5/6 rounded-full" />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="space-y-2">
                            <div className="skeleton h-2.5 w-12 rounded-full" />
                            <div className="skeleton h-5 w-20 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="skeleton h-2.5 w-10 rounded-full" />
                            <div className="skeleton h-4 w-14 rounded-full" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 dark:border-white/10">
                        <div className="skeleton h-8 w-24 rounded-full" />
                        <div className="skeleton h-8 w-24 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}
