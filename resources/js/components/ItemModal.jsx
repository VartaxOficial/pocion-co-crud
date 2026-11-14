import { useEffect, useRef, useState } from 'react';
import { Save, Sparkles, Wand2, X } from 'lucide-react';

import Modal from './Modal';
import { CATEGORIES, EMOJIS, ESTADOS, INPUT_CLASS, LABEL_CLASS, METHOD_STYLES } from '../lib/constants';
import { formatPrice } from '../lib/utils';

const EMPTY_FORM = {
    emoji: '🧪',
    nombre: '',
    categoria: 'Pociones',
    precio: '',
    stock: '',
    estado: 'disponible',
    descripcion: '',
};

function buildInitialValues(item) {
    if (!item) return { ...EMPTY_FORM };

    return {
        emoji: item.emoji,
        nombre: item.nombre,
        categoria: item.categoria,
        precio: String(item.precio),
        stock: String(item.stock),
        estado: item.estado,
        descripcion: item.descripcion,
    };
}

/**
 * Formulario de creación (POST) y edición (PATCH).
 * La validación ocurre en el cliente antes de tocar el "servidor".
 */
export default function ItemModal({ item, onClose, onSave }) {
    const isEdit = Boolean(item);
    const method = isEdit ? 'PATCH' : 'POST';
    const style = METHOD_STYLES[method];

    const [form, setForm] = useState(() => buildInitialValues(item));
    const [errors, setErrors] = useState({});
    const nombreRef = useRef(null);
    const formRef = useRef(null);

    // Enfoque automático en el primer campo, como en un modal bien diseñado.
    // Se hace en el mismo frame del montaje para que el usuario pueda escribir
    // de inmediato (y para que el foco no se pierda si el modal se re-renderiza).
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            nombreRef.current?.focus();
            nombreRef.current?.select?.();
        });

        return () => window.cancelAnimationFrame(frame);
    }, []);

    const setField = (field, value) => {
        setForm((previous) => ({ ...previous, [field]: value }));
        setErrors((previous) => {
            if (!previous[field]) return previous;

            const next = { ...previous };
            delete next[field];

            return next;
        });
    };

    const validate = () => {
        const nextErrors = {};

        if (form.nombre.trim().length < 2) {
            nextErrors.nombre = 'Ponle un nombre mágico de al menos 2 letras.';
        }

        const price = Number(form.precio);

        if (form.precio === '' || Number.isNaN(price) || price < 0) {
            nextErrors.precio = 'Introduce un precio de 0 o más.';
        }

        const stock = Number(form.stock);

        if (form.stock === '' || Number.isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
            nextErrors.stock = 'El stock debe ser un número entero mayor o igual a 0.';
        }

        if (form.descripcion.trim().length < 5) {
            nextErrors.descripcion = 'Escribe al menos 5 letras para que la búsqueda tenga sentido.';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = validate();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            document.getElementById(`campo-${Object.keys(nextErrors)[0]}`)?.focus();

            return;
        }

        const stock = Number(form.stock);
        let estado = form.estado;

        // Regla de negocio sencilla y visible: stock 0 => agotado.
        if (stock === 0) estado = 'agotado';

        onSave({
            emoji: form.emoji,
            nombre: form.nombre.trim(),
            categoria: form.categoria,
            precio: Number(form.precio),
            stock,
            estado,
            descripcion: form.descripcion.trim(),
        });
    };

    const previewName = form.nombre.trim() || 'Tu nuevo objeto mágico';
    const inputWithError = (field) =>
        `${INPUT_CLASS} ${errors[field] ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500/10 dark:border-rose-400/70' : ''}`;

    return (
        <Modal onClose={onClose} labelledBy="titulo-formulario">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                onKeyDown={(event) => {
                    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') formRef.current?.requestSubmit();
                }}
                noValidate
            >
                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200/70 bg-white/90 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/90 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl text-white shadow-lg shadow-violet-500/25">
                            {form.emoji}
                        </div>
                        <div>
                            <h2 id="titulo-formulario" className="font-display text-xl font-extrabold leading-tight text-slate-900 dark:text-white">
                                {isEdit ? 'Editar objeto mágico' : 'Nuevo objeto mágico'}
                            </h2>
                            <p className="text-[11px] font-bold text-slate-400">
                                {isEdit ? 'Se enviará un PATCH con los campos modificados' : 'Se enviará un POST y recibirás un id único'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        aria-label="Cerrar formulario"
                        data-tip="Cierra sin guardar. No se envía ninguna petición y los datos quedan intactos."
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
                    <div className="sm:col-span-2">
                        <span className={LABEL_CLASS}>
                            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                            Ícono mágico
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {EMOJIS.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setField('emoji', emoji)}
                                    aria-pressed={form.emoji === emoji}
                                    className={`grid h-10 w-10 place-items-center rounded-xl border text-xl transition hover:-translate-y-0.5 ${
                                        form.emoji === emoji
                                            ? 'border-violet-400 bg-violet-50 ring-2 ring-violet-400/30 dark:border-violet-400/60 dark:bg-violet-500/15'
                                            : 'border-slate-200 bg-white hover:border-violet-200 dark:border-slate-700 dark:bg-slate-900'
                                    }`}
                                    data-tip-title="Selector de emoji"
                                    data-tip="El emoji se guarda como texto Unicode dentro del campo `emoji` del JSON. No hay imágenes ni archivos extra."
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="campo-nombre" className={LABEL_CLASS}>
                            Nombre del objeto <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="campo-nombre"
                            ref={nombreRef}
                            value={form.nombre}
                            onChange={(event) => setField('nombre', event.target.value)}
                            placeholder="Ej. Poción de valor instantáneo"
                            className={inputWithError('nombre')}
                            aria-invalid={Boolean(errors.nombre)}
                            data-tip-title="Campo nombre"
                            data-tip="Es la clave principal visible del objeto. Se guarda como string y alimenta la búsqueda instantánea."
                        />
                        {errors.nombre && <p className="mt-1 text-[11px] font-bold text-rose-500">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label htmlFor="campo-categoria" className={LABEL_CLASS}>
                            Categoría
                        </label>
                        <select
                            id="campo-categoria"
                            value={form.categoria}
                            onChange={(event) => setField('categoria', event.target.value)}
                            className={`${INPUT_CLASS} cursor-pointer`}
                            data-tip-title="Campo categoría"
                            data-tip="Agrupa objetos y permite filtrar con GET ?categoria=… Es un campo enumerado: solo acepta las categorías definidas."
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.emoji} {category.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="campo-estado" className={LABEL_CLASS}>
                            Estado
                        </label>
                        <select
                            id="campo-estado"
                            value={form.estado}
                            onChange={(event) => setField('estado', event.target.value)}
                            className={`${INPUT_CLASS} cursor-pointer`}
                            data-tip-title="Campo estado"
                            data-tip="Indica disponibilidad. Si guardas con stock 0 se fuerza a Agotado automáticamente: una regla de negocio en acción."
                        >
                            {ESTADOS.map((estado) => (
                                <option key={estado.id} value={estado.id}>
                                    {estado.emoji} {estado.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="campo-precio" className={LABEL_CLASS}>
                            Precio <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">🪙</span>
                            <input
                                id="campo-precio"
                                type="number"
                                min="0"
                                step="1"
                                inputMode="numeric"
                                value={form.precio}
                                onChange={(event) => setField('precio', event.target.value)}
                                placeholder="25"
                                className={`${inputWithError('precio')} pl-9`}
                                aria-invalid={Boolean(errors.precio)}
                                data-tip-title="Campo precio"
                                data-tip="Número entero en monedas de oro. Se formatea con Intl.NumberFormat('es-ES') al mostrarlo, pero se guarda como número."
                            />
                        </div>
                        {errors.precio && <p className="mt-1 text-[11px] font-bold text-rose-500">{errors.precio}</p>}
                    </div>

                    <div>
                        <label htmlFor="campo-stock" className={LABEL_CLASS}>
                            Stock <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="campo-stock"
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={form.stock}
                            onChange={(event) => setField('stock', event.target.value)}
                            placeholder="10"
                            className={inputWithError('stock')}
                            aria-invalid={Boolean(errors.stock)}
                            data-tip-title="Campo stock"
                            data-tip="Unidades disponibles. Los botones + y − de cada tarjeta también modifican este campo con un PATCH rápido."
                        />
                        {errors.stock && <p className="mt-1 text-[11px] font-bold text-rose-500">{errors.stock}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="campo-descripcion" className={LABEL_CLASS}>
                            Descripción <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            id="campo-descripcion"
                            rows={3}
                            value={form.descripcion}
                            onChange={(event) => setField('descripcion', event.target.value)}
                            placeholder="Cuenta qué hace especial a este objeto…"
                            className={`${inputWithError('descripcion')} resize-none`}
                            aria-invalid={Boolean(errors.descripcion)}
                            data-tip-title="Campo descripción"
                            data-tip="Texto libre. Además de mostrarse en la tarjeta, participa en la búsqueda: el filtro revisa nombre, descripción y categoría."
                        />
                        <div className="mt-1 flex items-center justify-between gap-2">
                            {errors.descripcion ? (
                                <p className="text-[11px] font-bold text-rose-500">{errors.descripcion}</p>
                            ) : (
                                <span className="text-[10px] font-semibold text-slate-400">Se incluye en la búsqueda instantánea.</span>
                            )}
                            <span className="text-[10px] font-bold text-slate-400">{form.descripcion.length} caracteres</span>
                        </div>
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3 dark:border-violet-400/20 dark:from-violet-500/10 dark:to-fuchsia-500/5">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-sm dark:bg-slate-900">
                            {form.emoji}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-violet-500 dark:text-violet-300">
                                Vista previa
                            </p>
                            <p className="truncate font-display text-sm font-extrabold text-slate-800 dark:text-slate-100">
                                {previewName}
                            </p>
                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                {form.categoria} · {formatPrice(form.precio)} 🪙 · {form.stock || 0} uds.
                            </p>
                        </div>
                        <Wand2 className="ml-auto h-5 w-5 shrink-0 text-violet-400" />
                    </div>
                </div>

                <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-200/70 bg-white/90 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/90 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${style.chip}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {method} · {isEdit ? 'solo lo modificado' : 'objeto nuevo'}
                        <kbd className="ml-1 hidden rounded border border-slate-300/60 bg-white/50 px-1 font-mono text-[9px] sm:inline dark:border-slate-600 dark:bg-slate-900/40">
                            Ctrl + Enter
                        </kbd>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            data-tip="Cancela la operación. Equivale a pulsar Esc: no se envía nada."
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            data-tip-title={`Guardar (${method})`}
                            data-tip={
                                isEdit
                                    ? 'Compara el objeto actual con el formulario, calcula el diff y aplica un PATCH. Después se persiste en localStorage.'
                                    : 'Valida los campos y crea un objeto nuevo con id único mediante POST. Si es tu primer objeto, habrá confeti.'
                            }
                        >
                            <Save className="h-4 w-4" />
                            {isEdit ? 'Guardar cambios' : 'Crear objeto'}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
