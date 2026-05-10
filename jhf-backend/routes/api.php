<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PartnerController;

Route::get('/news', [NewsController::class, 'index']);
Route::get('/partners', [PartnerController::class, 'index']);