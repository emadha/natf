<?php

use App\Exports\SubmissionsExport;
use App\Http\Controllers\SubmissionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/goals', 'goals')->name('goals');

Route::get('/apply', [SubmissionController::class, 'create'])->name('submissions.create');
Route::post('/apply', [SubmissionController::class, 'store'])->name('submissions.store');

Route::get('export', function () {
    return Excel::download(new SubmissionsExport, 'membership_applications.xlsx');
});