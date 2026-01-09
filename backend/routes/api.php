<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Simple API test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Debug route
Route::get('/debug', function () {
    try {
        $user = \App\Models\User::where('email', 'test@example.com')->first();
        return response()->json([
            'user_exists' => $user ? true : false,
            'user_data' => $user,
            'token_count' => $user ? $user->tokens()->count() : 0
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]);
    }
});
