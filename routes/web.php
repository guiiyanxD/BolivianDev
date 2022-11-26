<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\MeetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
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




    /**
     * Routes to create and join to a meet being a host
     */
    Route::post('meet/store', [MeetController::class, 'storeAsHost'])
        ->name('meet.storeAsHost');
    Route::any('/board', [MeetController::class,'joinToMeet'])
        ->name('board');

    /**
     * Routes to join to meet as guest
     */
    Route::post('meet/join',[MeetController::class, 'storeAsGuest'])
        ->name('meet.storeAsGuest');


    /**
     * Route to edit Invitation Code rules and name and description of a meet
     */
    Route::get('invitation_code/{meet_id}/{invite_id}/edit', [InviteController::class,'edit'])->name('invite.edit');
    Route::put('invitation/{meet_id}/{invite_id}/update',[InviteController::class,'update'])->name('invite.update');

    /**
     * Main route after logged to create a meeting
     */
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


    /**
     * Routes to save and update json backup of the meets element
     */
    Route::any('meet/backup/update', [BackupController::class,'update'])->name('backup.update');
    Route::post('meet/backup/load',[BackupController::class,'load'])->name('backup.load');



    Auth::routes();
    Broadcast::routes();


});


//require __DIR__.'/auth.php';

