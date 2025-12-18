<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
->withMiddleware(function (Middleware $middleware): void {

    // ✅ Alias middleware (biar masih bisa pakai 'role' di routes)
    $middleware->alias([
        'role' => \App\Http\Middleware\RoleMiddleware::class,
    ]);

    // ✅ Middleware global untuk web & API
    $middleware->web(append: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);

    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);
})

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
