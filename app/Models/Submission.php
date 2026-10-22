<?php

namespace App\Models;

use App\Observers\SubmissionObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(SubmissionObserver::class)]
class Submission extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'submissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // Personal Information
        'full_name',
        'place_of_birth',
        'civil_registry_number',
        'date_of_birth',
        'residential_address',
        'occupation',
        'work_address',
        'phone_number',
        'mobile_number',
        'educational_level',
        'blood_type',

        // Other Association Membership
        'is_member_of_other_assoc',
        'other_assoc_name',
        'other_assoc_address',

        // Document Attachment
        'doc_id_copy',

        // Administrative Section
        'status',
        'decision_number',
        'board_meeting_date',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'board_meeting_date' => 'date',
            'is_member_of_other_assoc' => 'boolean',
        ];
    }
}