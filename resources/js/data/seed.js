// ---------------------------------------------------------------------------
// Semilla de fábrica. Son los 6 objetos que aparecen la primera vez (y al
// pulsar "Reiniciar datos de fábrica"). Mantener los ids estables hace que
// el reinicio sea predecible y fácil de explicar.
// ---------------------------------------------------------------------------

export const SEED_ITEMS = [
    {
        id: 'poc-001',
        nombre: 'Poción de Fuerza Felina',
        categoria: 'Pociones',
        precio: 25,
        stock: 12,
        estado: 'disponible',
        emoji: '🐱',
        descripcion: 'Otorga agilidad y bigotes elegantes durante 30 minutos. Efecto secundario: ronroneo incontrolable.',
        actualizadoEn: '2026-11-12T09:15:00.000Z',
    },
    {
        id: 'poc-002',
        nombre: 'Elixir de Risas Eternas',
        categoria: 'Pociones',
        precio: 40,
        stock: 3,
        estado: 'pocas',
        emoji: '😂',
        descripcion: 'Un trago y no podrás parar de reír. Muy solicitado en fiestas de gnomos y bodas de hadas.',
        actualizadoEn: '2026-11-12T11:40:00.000Z',
    },
    {
        id: 'poc-003',
        nombre: 'Polvo de Estrella Fugaz',
        categoria: 'Ingredientes',
        precio: 18,
        stock: 0,
        estado: 'agotado',
        emoji: '✨',
        descripcion: 'Recolectado durante la lluvia de meteoros de octubre. Se usa para hechizos de teletransporte.',
        actualizadoEn: '2026-11-10T20:05:00.000Z',
    },
    {
        id: 'poc-004',
        nombre: 'Varita de Roble Susurrante',
        categoria: 'Artefactos',
        precio: 120,
        stock: 7,
        estado: 'disponible',
        emoji: '🪄',
        descripcion: 'Susurra consejos a quien la sostiene. Núcleo de pluma de fénix y un carácter bastante opinativo.',
        actualizadoEn: '2026-11-13T08:30:00.000Z',
    },
    {
        id: 'poc-005',
        nombre: 'Huevo de Dragón Miniatura',
        categoria: 'Criaturas',
        precio: 350,
        stock: 2,
        estado: 'pocas',
        emoji: '🐉',
        descripcion: 'Tibio al tacto y ligeramente radiactivo. Requiere manta ignífuga; el dragón nace en primavera.',
        actualizadoEn: '2026-11-13T15:20:00.000Z',
    },
    {
        id: 'poc-006',
        nombre: 'Té de Luna Llena',
        categoria: 'Pociones',
        precio: 15,
        stock: 24,
        estado: 'disponible',
        emoji: '🌙',
        descripcion: 'Infusión suave que regala sueños lúcidos. Servir caliente y sin azúcar, por favor.',
        actualizadoEn: '2026-11-11T22:45:00.000Z',
    },
];

/** Copia profunda para que ningún componente mute la semilla original. */
export const getSeedItems = () => SEED_ITEMS.map((item) => ({ ...item }));
