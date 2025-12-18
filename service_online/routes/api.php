<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminApiController;
use App\Http\Controllers\Api\ServiceRequestApiController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//midleware admin untuk update
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admins', [AdminApiController::class, 'index']);
    Route::post('/admins', [AdminApiController::class, 'store']);
    Route::put('/admins/{id}', [AdminApiController::class, 'update']);
    Route::delete('/admins/{id}', [AdminApiController::class, 'destroy']);
});

Route::post('/service-requests', [ServiceRequestApiController::class, 'store']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/service-requests', [ServiceRequestApiController::class, 'index']);
    Route::put('/service-requests/{id}/status', [ServiceRequestApiController::class, 'updateStatus']);
});