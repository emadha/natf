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


Route::get('/test-email', function () {
    try {
        Mail::raw('هذا إيميل تجريبي لختبار إعدادات Gmail SMTP.', function ($message) {
            $message->to('ntf.media.lb@gmail.com') // Replace with the recipient address
            ->subject('اختبار إرسال البريد - تجمع عائلات طرابلس والشمال');
        });

        return 'تم إرسال البريد الإلكتروني بنجاح! تحقق من صندوق الوارد.';
    } catch (\Exception $e) {
        return 'فشل إرسال البريد: ' . $e->getMessage();
    }
});
