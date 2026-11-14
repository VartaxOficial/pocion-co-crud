# 🧪 Poción & Co. — Inventario mágico CRUD

Una aplicación web **interactiva y educativa** para gestionar el inventario de una tienda de pociones mágicas mientras aprendes qué ocurre “detrás de cámaras” en cada operación CRUD.

> Construida con **React + Vite + Tailwind CSS + Lucide**, servida por **Laravel 12**. Sin base de datos: los datos viven en `localStorage`.

---

## ✨ Características

### 🧙 Temática y datos
- Inventario de pociones, ingredientes, artefactos y criaturas.
- **6 reliquias precargadas** para empezar sin rellenar formularios.
- Botón **“Reiniciar datos de fábrica”** con confirmación.

### 🔮 Modo Aprendizaje (Rayos X)
Activado por defecto desde la barra superior.

- **Tooltips inteligentes** en cada botón, campo y sección.
- **Consola en vivo** con:
  - Método HTTP coloreado: `GET`, `POST`, `PATCH`, `DELETE`.
  - Endpoint y *query params* simulados.
  - **Diff JSON antes/después** estilo Git.
  - Explicación en lenguaje sencillo de cada operación.

### 🪄 Experiencia de uso
- CRUD completo: crear, leer/filtrar, actualizar y eliminar.
- Búsqueda instantánea, filtros por categoría/estado y ordenamiento.
- Modal de edición con autofoco, validación y vista previa.
- Ajuste rápido de stock con `−` / `+` (PATCH parcial).
- Toasts divertidos, confeti al crear el primer objeto y animaciones suaves.
- Persistencia en `localStorage` con **300 ms simulados** y skeletons de carga.
- Modo claro/oscuro persistente.
- Diseño responsive y accesible (`prefers-reduced-motion`, roles ARIA).

### ⌨️ Atajos de teclado

| Tecla | Acción |
|---|---|
| `N` | Nuevo objeto |
| `/` o `Ctrl + K` | Buscar |
| `Esc` | Cerrar modales y paneles |
| `?` | Guía de atajos |
| `D` | Cambiar tema |
| `M` | Activar/desactivar Rayos X |
| `Ctrl + Enter` | Guardar formulario |

---

## 🧰 Stack

- [React 19](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Laravel 12](https://laravel.com/) como host de la SPA

---

## 🚀 Instalación y uso

Requisitos: **Node.js 20+**, **PHP 8.2+** y **Composer**.

```bash
# 1. Dependencias
npm install
composer install

# 2. Servidor de Vite (terminal 1)
npm run dev

# 3. Servidor de Laravel (terminal 2)
php artisan serve
```

Abre **http://127.0.0.1:8000**.

También puedes levantar todo con:

```bash
composer run dev
```

### Compilar para producción

```bash
npm run build
```

---

## 📁 Estructura

```text
app/                          Backend Laravel (mínimo)
resources/views/app.blade.php Vista que monta la SPA
resources/css/app.css         Tailwind + animaciones
resources/js/
├── main.jsx                  Punto de entrada de React
├── App.jsx                   Estado global, CRUD y consola
├── components/               Tarjetas, modales, toolbar, panel Rayos X…
├── hooks/                    Persistencia, atajos y tooltips
├── lib/                      Constantes, colores HTTP y utilidades
└── data/seed.js              Datos de fábrica
routes/web.php                Ruta / → vista app
```

---

## 💾 Persistencia

| Clave | Contenido |
|---|---|
| `pociones:items:v1` | Inventario completo |
| `pociones:ui:v1` | Tema y preferencias |
| `pociones:confetti:v1` | Bandera del primer confeti |

No se usa MySQL ni ninguna base de datos. El archivo `.env` está excluido del repositorio.

---

## ✅ Verificación

- `npm run build` compila correctamente.
- `php artisan test` pasa.
- Suite E2E con navegador real: **32/32 comprobaciones** (CRUD, diffs, filtros, atajos, persistencia, tema, responsive y cero errores de consola).

---

Hecho con 💜 para aprender cómo funciona un CRUD por dentro.
