<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

            // Personal Information (المعلومات الشخصية)
            $table->string('full_name'); // الإسم الثلاثي
            $table->date('date_of_birth')->nullable(); // تاريخ الميلاد
            $table->string('place_of_birth')->nullable(); // مكان الولادة
            $table->string('residential_address')->nullable(); // عنوان السكن
            $table->string('occupation')->nullable(); // المهنة
            $table->string('work_address')->nullable(); // عنوان العمل
            $table->string('phone_number')->nullable(); // رقم الهاتف
            $table->string('mobile_number')->nullable(); // رقم الخلوي
            $table->string('educational_level')->nullable(); // التحصيل العلمي
            $table->string('blood_type', 5)->nullable(); // فئة الدم

            // Other Association Membership (عضوية جمعيات أخرى)
            $table->boolean('is_member_of_other_assoc')->default(false); // هل منتسب إلى جمعية أخرى
            $table->string('other_assoc_name')->nullable(); // إسم الجمعية
            $table->string('other_assoc_address')->nullable(); // عنوانها

            // Administrative Section (خاص بالهيئة الإدارية)
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending'); // تقرر قبول / رفض إنتساب
            $table->string('decision_number')->nullable(); // بموجب قرار
            $table->date('board_meeting_date')->nullable(); // تاريخ جلسة الهيئة الإدارية
            $table->string('submission_location')->default('Tripoli'); // طرابلس في
            $table->date('submission_date')->nullable(); // تاريخ التقديم

            // Submitted Documents checklist / paths (المستندات المرفقة)
            $table->boolean('doc_id_copy')->default(false); // صورة عن الهوية أو إخراج القيد
            $table->boolean('doc_judicial_record')->default(false); // سجل عدلي جديد
            $table->boolean('doc_degree_copy')->default(false); // صورة عن الشهادة العلمية
            $table->boolean('doc_photos')->default(false); // صورتان شمسيتان

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};