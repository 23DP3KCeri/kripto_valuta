<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::post('/auth/logout',  [AuthController::class, 'logout']);
    Route::get('/auth/user',     [AuthController::class, 'user']);

    Route::get('/wallets',       [WalletController::class, 'index']);

    Route::get('/transactions',                    [TransactionController::class, 'index']);
    Route::post('/transactions',                   [TransactionController::class, 'store']);
    Route::put('/transactions/{transaction}',      [TransactionController::class, 'update']);
    Route::delete('/transactions/{transaction}',   [TransactionController::class, 'destroy']);

    // Admin only
    Route::middleware('admin')->group(function () {
        Route::get('/users',                  [UserController::class, 'index']);
        Route::delete('/users/{user}',        [UserController::class, 'destroy']);
        Route::patch('/users/{user}/promote', [UserController::class, 'promote']);
    });
});
