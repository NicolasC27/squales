<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminGalleryController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/album', [AlbumController::class, 'show']);


/**
 * Admin gallery
 */
Route::get('/admin/gallery', [AdminGalleryController::class, 'show']);
Route::get('/admin/gallery/album/{id}', [AlbumController::class, 'view']);
Route::post('/admin/gallery/upload/', [AdminGalleryController::class, 'uploadPictures'])->withoutMiddleware('api');
Route::post('/admin/gallery/upload/crop', [AdminGalleryController::class, 'cropPictures'])->withoutMiddleware('api');
Route::post('/admin/gallery/create/', [AdminGalleryController::class, 'createAlbum']);
Route::delete('/admin/gallery/picture/{id}', [AdminGalleryController::class, 'deletePicture'])->middleware('auth:sanctum');

/**
 * User
 */
Route::get('/user', [UserController::class, 'getUserDiver']);

/**
 * Auth
 */
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::get('/auth/token', [AuthController::class, 'auth'])->middleware('auth:sanctum');
