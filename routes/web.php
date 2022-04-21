<?php

use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'app')->name('home');
Route::post('/upload', [UploadController::class, 'store'])->name('upload.store');
Route::post('/upload/remove', [UploadController::class, 'destroy'])->name('upload.remove');
