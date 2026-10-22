<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

            // Personal Information
            $table->string('full_name');
            $table->string('place_of_birth');
            $table->string('civil_registry_number');
            $table->date('date_of_birth');
            $table->string('residential_address');
            $table->string('occupation');
            $table->string('work_address');
            $table->string('phone_number');
            $table->string('mobile_number');
            $table->string('educational_level');
            $table->string('blood_type', 5);

            // Other Association Membership
            $table->boolean('is_member_of_other_assoc')->default(false);
            $table->string('other_assoc_name')->nullable();
            $table->string('other_assoc_address')->nullable();

            // Document Attachment
            $table->string('doc_id_copy');

            // Administrative Section
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->string('decision_number')->nullable();
            $table->date('board_meeting_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};