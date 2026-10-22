<?php

namespace App\Mail;

use App\Models\Submission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubmissionReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Submission $submission
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'طلب إنتساب جديد: '.$this->submission->full_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.submissions.received',
        );
    }
}