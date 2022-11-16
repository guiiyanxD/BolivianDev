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
 * Route to edit Invitation Code rules and name and description of a meet
 */
Route::get('invitation_code/{meet_id}/{invite_id}/edit', [\App\Http\Controllers\InviteController::class,'edit'])->name('invite.edit');
Route::put('invitation/{meet_id}/{invite_id}/update',[\App\Http\Controllers\InviteController::class,'update'])->name('invite.update');

/**
 * Main route after logged to create a meeting
 */
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


/**
 * Routes to save and update json backup of the meets element
 */
Route::any('meet/backup/update', [\App\Http\Controllers\BackupController::class,'update'])->name('backup.update');
Route::any('meet/backup/load',[\App\Http\Controllers\BackupController::class,'load'])->name('backup.load');

Auth::routes();
\Illuminate\Support\Facades\Broadcast::routes();
//require __DIR__.'/auth.php';

