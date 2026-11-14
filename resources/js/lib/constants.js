// ---------------------------------------------------------------------------
// Constantes compartidas: categorías, estados, colores HTTP y textos de UI.
// Todo el "design system" vive aquí para que los componentes sean simples.
// ---------------------------------------------------------------------------

export const STORAGE_KEYS = {
    items: 'pociones:items:v1',
    ui: 'pociones:ui:v1',
    confetti: 'pociones:confetti:v1',
};

export const CATEGORIES = [
    {
        id: 'Pociones',
        emoji: '🧪',
        chip: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200',
        glow: 'from-violet-500/30 to-fuchsia-400/10',
        accent: 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-400',
        bar: 'bg-violet-500',
        text: 'text-violet-600 dark:text-violet-300',
    },
    {
        id: 'Ingredientes',
        emoji: '🌿',
        chip: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200',
        glow: 'from-emerald-500/25 to-lime-400/10',
        accent: 'bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-400',
        bar: 'bg-emerald-500',
        text: 'text-emerald-600 dark:text-emerald-300',
    },
    {
        id: 'Artefactos',
        emoji: '🪄',
        chip: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200',
        glow: 'from-amber-400/30 to-orange-400/10',
        accent: 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400',
        bar: 'bg-amber-500',
        text: 'text-amber-600 dark:text-amber-300',
    },
    {
        id: 'Criaturas',
        emoji: '🐉',
        chip: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-200',
        glow: 'from-sky-500/25 to-cyan-400/10',
        accent: 'bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400',
        bar: 'bg-sky-500',
        text: 'text-sky-600 dark:text-sky-300',
    },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((category) => [category.id, category]));

export const ESTADOS = [
    {
        id: 'disponible',
        label: 'Disponible',
        emoji: '✅',
        badge: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200',
        dot: 'bg-emerald-500',
        tone: 'text-emerald-600 dark:text-emerald-300',
    },
    {
        id: 'pocas',
        label: 'Pocas unidades',
        emoji: '🔥',
        badge: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200',
        dot: 'bg-amber-500',
        tone: 'text-amber-600 dark:text-amber-300',
    },
    {
        id: 'agotado',
        label: 'Agotado',
        emoji: '🚫',
        badge: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200',
        dot: 'bg-rose-500',
        tone: 'text-rose-600 dark:text-rose-300',
    },
];

export const ESTADO_MAP = Object.fromEntries(ESTADOS.map((estado) => [estado.id, estado]));

export const SORT_OPTIONS = [
    { id: 'recientes', label: 'Más recientes' },
    { id: 'precio-desc', label: 'Precio: mayor a menor' },
    { id: 'precio-asc', label: 'Precio: menor a mayor' },
    { id: 'stock-asc', label: 'Stock: menos primero' },
    { id: 'nombre', label: 'Nombre (A-Z)' },
];

export const METHOD_STYLES = {
    GET: {
        chip: 'border-sky-300/80 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300',
        dot: 'bg-sky-500',
        solid: 'bg-sky-500',
        soft: 'bg-sky-500/10',
        legend: 'Solo lee. No cambia ningún dato.',
    },
    POST: {
        chip: 'border-violet-300/80 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:text-violet-300',
        dot: 'bg-violet-500',
        solid: 'bg-violet-500',
        soft: 'bg-violet-500/10',
        legend: 'Crea un recurso nuevo.',
    },
    PATCH: {
        chip: 'border-amber-300/80 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300',
        dot: 'bg-amber-500',
        solid: 'bg-amber-500',
        soft: 'bg-amber-500/10',
        legend: 'Actualiza campos concretos.',
    },
    DELETE: {
        chip: 'border-rose-300/80 bg-rose-500/10 text-rose-700 dark:border-rose-400/30 dark:text-rose-300',
        dot: 'bg-rose-500',
        solid: 'bg-rose-500',
        soft: 'bg-rose-500/10',
        legend: 'Elimina un recurso por su id.',
    },
};

export const EMOJIS = ['🧪', '✨', '🍄', '🌙', '🪄', '🐉', '🔮', '🦄', '🍀', '⭐', '🧹', '🐸'];

/** Altura máxima de la barra de stock (solo visual). */
export const MAX_STOCK = 40;

/** Clases reutilizadas por todos los formularios. */
export const INPUT_CLASS =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400';

export const LABEL_CLASS =
    'mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400';
