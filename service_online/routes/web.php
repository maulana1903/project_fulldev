<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceRequestAdminController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperUserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'role:superuser'])->group(function () {
    Route::get('/register-admin', [AdminController::class, 'showRegisterForm'])->name('register.admin');
    Route::post('/register-admin', [AdminController::class, 'registerAdmin'])->name('register.admin.post');
});

use App\Helpers\DistanceHelper;

Route::get('/test-distance', function () {
    // Misal kantor kamu di titik ini (contoh: Jakarta)
    $officeLat = -7.718996012879748;
    $officeLon = 110.74708556128061;

    // Misal client di sini (contoh: Bekasi)
    $clientLat = -6.240000;
    $clientLon = 107.000000;

    $distance = DistanceHelper::calculateDistance($officeLat, $officeLon, $clientLat, $clientLon);

    return "Jaraknya: " . round($distance, 2) . " km";
});
use App\Http\Controllers\ClientServiceController;

Route::get('/service-request', [ClientServiceController::class, 'create'])->name('client.form');
Route::post('/service-request', [ClientServiceController::class, 'store'])->name('client.store');


Route::middleware(['auth', 'role:admin,superuser'])->group(function () {
    Route::get('/admin/requests', [ServiceRequestAdminController::class, 'index'])->name('admin.requests');
    Route::post('/admin/requests/{id}/approve', [ServiceRequestAdminController::class, 'approve'])->name('admin.approve');
    Route::post('/admin/requests/{id}/reject', [ServiceRequestAdminController::class, 'reject'])->name('admin.reject');
});
Route::get('/admin/requests', [ServiceRequestAdminController::class, 'index'])
    ->name('admin.service_requests.index')
    ->middleware(['auth', 'role:admin,superuser']);



Route::middleware(['auth', 'role:superuser'])->group(function () {
    Route::get('/superuser', [SuperUserController::class, 'index'])->name('superuser.index');
    Route::get('/superuser/create', [SuperUserController::class, 'create'])->name('superuser.create');
    Route::post('/superuser', [SuperUserController::class, 'store'])->name('superuser.store');
    Route::get('/superuser/{id}/edit', [SuperUserController::class, 'edit'])->name('superuser.edit');
    Route::put('/superuser/{id}', [SuperUserController::class, 'update'])->name('superuser.update');
    Route::delete('/superuser/{id}', [SuperUserController::class, 'destroy'])->name('superuser.destroy');
});


require __DIR__.'/auth.php';
