<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

        // Administrative Section
        'status',
        'decision_number',
        'board_meeting_date',
        'submission_location',
        'submission_date',

        // Documents
        'doc_id_copy',
        'doc_judicial_record',
        'doc_degree_copy',
        'doc_photos',
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
            'submission_date' => 'date',
            'is_member_of_other_assoc' => 'boolean',
            'doc_id_copy' => 'boolean',
            'doc_judicial_record' => 'boolean',
            'doc_degree_copy' => 'boolean',
            'doc_photos' => 'boolean',
        ];
    }
}