import { useCallback, useEffect, useRef, useState } from 'react';

import { STORAGE_KEYS } from '../lib/constants';
import { getSeedItems } from '../data/seed';
import { sleep } from '../lib/utils';

/**
 * Hook que simula una API real usando localStorage.
 *
 * - Lectura inicial: espera ~650 ms y luego carga (o siembra) los datos.
 * - Escritura: espera 300 ms antes de persistir para que se vea el estado
 *   "Guardando…". Así el usuario entiende que hay una operación asíncrona.
 */
export function useInventory() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const saveTimer = useRef(null);

    // 1) "GET" inicial con latencia simulada.
    useEffect(() => {
        let alive = true;

        (async () => {
            await sleep(650);

            if (!alive) return;

            let stored = null;

            try {
                stored = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.items) ?? 'null');
            } catch {
                stored = null;
            }

            // Un array vacío es un estado válido (el usuario borró todo).
            setItems(Array.isArray(stored) ? stored : getSeedItems());
            setLoading(false);
        })();

        return () => {
            alive = false;
        };
    }, []);

    // 2) "PATCH del almacenamiento": debounce de 300 ms antes de escribir.
    useEffect(() => {
        if (loading) return;

        setSaving(true);
        window.clearTimeout(saveTimer.current);

        saveTimer.current = window.setTimeout(() => {
            try {
                window.localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(items));
            } catch (error) {
                console.error('No se pudo guardar en localStorage:', error);
            }

            setSaving(false);
        }, 300);

        return () => window.clearTimeout(saveTimer.current);
    }, [items, loading]);

    const resetInventory = useCallback(() => {
        setItems(getSeedItems());
    }, []);

    return { items, setItems, loading, saving, resetInventory };
}
