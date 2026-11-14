import { useEffect } from 'react';

const SIZES = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-2xl',
    lg: 'sm:max-w-3xl',
};

/**
 * Contenedor accesible para todos los modales:
 * - bloquea el scroll del body mientras está abierto;
 * - cierra al hacer clic en el fondo;
 * - usa role="dialog" y aria-modal.
 *
 * La tecla Esc se gestiona de forma global en App.jsx.
 */
export default function Modal({ children, onClose, labelledBy, size = 'md' }) {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <button
                type="button"
                tabIndex={-1}
                aria-label="Cerrar modal"
                onClick={onClose}
                className="absolute inset-0 h-full w-full cursor-default bg-slate-950/50 backdrop-blur-sm animate-fade-in"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                className={`scrollbar-thin relative max-h-[92vh] w-full animate-modal-in overflow-y-auto rounded-t-[2rem] border border-white/60 bg-white/95 shadow-2xl shadow-slate-950/25 dark:border-white/10 dark:bg-slate-950/95 sm:rounded-[2rem] ${SIZES[size]}`}
            >
                {children}
            </div>
        </div>
    );
}
