<?php

use Illuminate\Http\Request;
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

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth'])->group(function() {
    Route::resource('/invitation', '\App\Http\Controllers\InviteController')->only(['index', 'create', 'store','will']);
    Route::resource('/tipo-participacion', '\App\Http\Controllers\ParticipacionController');


/*    Route::any('/board',[\App\Http\Controllers\InviteController::class,'IncrementWhenCodeIsUsed'])
        ->name('board')
        ->middleware('protected_by_invite_codes');*/
});

/**
 * Routes to create and join to a meet being a host
 */
Route::post('meet/store', [\App\Http\Controllers\MeetController::class, 'storeAsHost'])
    ->name('meet.storeAsHost');
Route::any('/board', [\App\Http\Controllers\MeetController::class,'joinToMeet'])
    ->name('board');

/**
 * Routes to join to meet as guest
 */
Route::post('meet/join',[\App\Http\Controllers\MeetController::class, 'storeAsGuest'])
    ->name('meet.storeAsGuest');


/**
 * Main route after logged to create a meeting
 */
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Auth::routes();
\Illuminate\Support\Facades\Broadcast::routes();
//require __DIR__.'/auth.php';

