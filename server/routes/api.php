<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->prefix('/auth')->group(function () {
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AuthController::class)->prefix('/auth')->group(function () {
        Route::get('/me', 'me');
        Route::post('/logout', 'logout');
    });

    Route::controller(GenderController::class)->prefix('/gender')->group(function () {
        Route::get('/loadGenders', 'loadGenders');
        Route::get('/getGender/{gender_id}', 'getGender');
        Route::post('/storeGender', 'storeGender');
        Route::put('/updateGender/{gender_id}', 'updateGender');
        Route::delete('/destroyGender/{gender_id}', 'destroyGender');
    });

    Route::controller(UserController::class)->prefix('/user')->group(function () {
        Route::get('/loadUsers', 'loadUsers');
        Route::post('/storeUser', 'storeUser');
        Route::put('/updateUser/{user_id}', 'updateUser');
        Route::delete('/destroyUser/{user_id}', 'destroyUser');
    });
});
