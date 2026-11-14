<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas web
|--------------------------------------------------------------------------
| La aplicación es una SPA de React montada por Vite. Laravel solo se
| encarga de servir la vista contenedora; los datos viven en localStorage.
*/

Route::get('/', fn () => view('app'))->name('inicio');
