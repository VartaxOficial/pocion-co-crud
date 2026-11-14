<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Poción & Co.: un CRUD mágico, interactivo y educativo. Gestiona tu inventario y descubre el HTTP que hay detrás de cada clic.">
    <meta name="theme-color" content="#8b5cf6">
    <title>Poción &amp; Co. · Inventario mágico CRUD</title>

    {{-- Aplicamos el tema antes del primer pintado para evitar el "flash" blanco. --}}
    <script>
        (function () {
            try {
                var stored = JSON.parse(localStorage.getItem('pociones:ui:v1') || '{}');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored.tema || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch (error) {
                /* localStorage puede estar bloqueado: seguimos con el tema claro. */
            }
        })();
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
</head>
<body class="min-h-screen bg-[#faf8ff] text-slate-800 antialiased dark:bg-[#0b0f1d] dark:text-slate-100">
    <div id="app"></div>

    <noscript>
        <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
            ✨ Esta aplicación necesita JavaScript para funcionar. Actívalo y recarga la página.
        </div>
    </noscript>
</body>
</html>
