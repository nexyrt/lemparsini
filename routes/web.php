<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

// Template routes (public)
Route::prefix('templates')->name('templates.')->group(function () {
    Route::get('/', [Controllers\TemplateController::class, 'index'])->name('index');
    Route::get('/preview/{template}', [Controllers\TemplateController::class, 'preview'])->name('preview');
    Route::get('/{category}', [Controllers\TemplateController::class, 'category'])->name('category');
    Route::get('/{category}/{template}', [Controllers\TemplateController::class, 'show'])->name('show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
