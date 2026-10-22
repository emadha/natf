<?php

namespace App\Observers;

use App\Mail\SubmissionReceivedMail;
use App\Models\Submission;
use Illuminate\Support\Facades\Mail;

class SubmissionObserver
{
    /**
     * Handle the Submission "created" event.
     */
    public function created(Submission $submission): void
    {
        // Replace with your admin/notification email address
        $adminEmail = config('mail.admin_address', 'admin@example.com');

        Mail::to($adminEmail)->send(new SubmissionReceivedMail($submission));
    }
}