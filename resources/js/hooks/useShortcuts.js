import { useEffect } from 'react';

/**
 * Atajos de teclado globales.
 *
 * Esc funciona incluso mientras se escribe; el resto se desactiva dentro de
 * inputs, textareas y selects para no romper la escritura normal.
 */
export function useShortcuts({ onNew, onSearch, onHelp, onEscape, onTheme, onLearning }) {
    useEffect(() => {
        const isTyping = (target) =>
            target instanceof HTMLElement &&
            (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable);

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onEscape();
                return;
            }

            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                onSearch();
                return;
            }

            if (isTyping(event.target) || event.altKey || event.metaKey || event.ctrlKey) return;

            switch (event.key) {
                case 'n':
                case 'N':
                    event.preventDefault();
                    onNew();
                    break;
                case '/':
                    event.preventDefault();
                    onSearch();
                    break;
                case '?':
                    event.preventDefault();
                    onHelp();
                    break;
                case 'd':
                case 'D':
                    event.preventDefault();
                    onTheme();
                    break;
                case 'm':
                case 'M':
                    event.preventDefault();
                    onLearning();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNew, onSearch, onHelp, onEscape, onTheme, onLearning]);
}
