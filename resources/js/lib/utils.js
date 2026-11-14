// ---------------------------------------------------------------------------
// Utilidades puras: ids, formato, diffs de objetos y construcción de queries.
// Al ser funciones sin estado son fáciles de testear y reutilizar.
// ---------------------------------------------------------------------------

export function uid(prefix = 'pocion') {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
    }

    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export const clone = (value) => JSON.parse(JSON.stringify(value));

export const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function formatPrice(value) {
    return new Intl.NumberFormat('es-ES').format(Number(value) || 0);
}

export function formatTime(date = new Date()) {
    return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
}

export function formatDate(value) {
    try {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(value));
    } catch {
        return '—';
    }
}

/**
 * Devuelve solo los campos que cambiaron entre dos objetos.
 * Es la base del "diff visual" que se muestra en la consola Rayos X.
 */
export function diffObjects(before, after, { ignore = [] } = {}) {
    const previous = before ?? {};
    const next = after ?? {};
    const keys = [...new Set([...Object.keys(previous), ...Object.keys(next)])];

    return keys
        .filter((field) => !ignore.includes(field))
        .map((field) => ({
            field,
            before: previous[field],
            after: next[field],
            changed: JSON.stringify(previous[field]) !== JSON.stringify(next[field]),
        }))
        .filter((change) => change.changed);
}

/** Traduce los filtros de la UI a una query string estilo API real. */
export function buildQuery({ search, categoria, estado, orden } = {}) {
    const params = {};
    const term = (search ?? '').trim();

    if (term) params.search = term;
    if (categoria && categoria !== 'Todas') params.categoria = categoria;
    if (estado && estado !== 'todos') params.estado = estado;
    if (orden && orden !== 'recientes') params.orden = orden;

    const qs = new URLSearchParams(params).toString();

    return {
        params,
        qs,
        endpoint: `/pociones${qs ? `?${qs}` : ''}`,
    };
}

/** Acorta un valor para mostrarlo dentro del diff sin romper el layout. */
export function shortValue(value, max = 46) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';

    const raw = typeof value === 'string' ? `"${value}"` : JSON.stringify(value);

    return raw.length > max ? `${raw.slice(0, max - 1)}…` : raw;
}

export const pluralize = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;
