import { useEffect, useState } from 'react';

/**
 * Tooltips globales por delegación de eventos.
 *
 * Cualquier elemento con `data-tip="texto"` (y opcionalmente
 * `data-tip-title="Título"`) muestra una tarjeta flotante al pasar el cursor
 * o al enfocarlo con el teclado. No hace falta envolver cada botón.
 */
export function useTooltips(enabled) {
    const [tip, setTip] = useState(null);

    useEffect(() => {
        if (!enabled) {
            setTip(null);
            return undefined;
        }

        let active = null;

        const show = (element) => {
            const text = element?.getAttribute?.('data-tip');

            if (!text) return;

            active = element;
            const rect = element.getBoundingClientRect();

            setTip({
                title: element.getAttribute('data-tip-title') || '',
                text,
                rect: {
                    top: rect.top,
                    bottom: rect.bottom,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                },
            });
        };

        const hide = () => {
            active = null;
            setTip(null);
        };

        const handleOver = (event) => {
            const element = event.target.closest?.('[data-tip]');

            if (element && element !== active) show(element);
        };

        const handleOut = (event) => {
            if (!active) return;

            const element = event.target.closest?.('[data-tip]');

            if (element !== active) return;
            if (event.relatedTarget && active.contains(event.relatedTarget)) return;

            hide();
        };

        const handleFocus = (event) => {
            const element = event.target.closest?.('[data-tip]');

            if (element) show(element);
        };

        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', hide);
        document.addEventListener('mousedown', hide);
        window.addEventListener('scroll', hide, true);

        return () => {
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', hide);
            document.removeEventListener('mousedown', hide);
            window.removeEventListener('scroll', hide, true);
        };
    }, [enabled]);

    return tip;
}
