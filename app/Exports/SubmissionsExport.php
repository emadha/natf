<?php

namespace App\Exports;

use App\Models\Submission;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class SubmissionsExport implements FromCollection, WithHeadings, WithMapping, WithCustomCsvSettings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection(): \Illuminate\Support\Enumerable
    {
        return Submission::all();
    }

    /**
     * Headings for the export columns (Arabic labels matching the form)
     */
    public function headings(): array
    {
        return [
            'المعرف (ID)',
            'الإسم الثلاثي',
            'تاريخ الميلاد',
            'مكان الولادة',
            'عنوان السكن',
            'المهنة',
            'عنوان العمل',
            'رقم الهاتف',
            'رقم الخلوي',
            'التحصيل العلمي',
            'فئة الدم',
            'منتسب لجمعية أخرى',
            'إسم الجمعية',
            'عنوان الجمعية',
            'حالة الطلب',
            'رقم القرار',
            'تاريخ جلسة الهيئة',
            'موقع التقديم',
            'تاريخ التقديم',
            'صورة الهوية/إخراج قيد',
            'سجل عدلي',
            'صورة الشهادة',
            'صور شمسية',
            'تاريخ الإنشاء',
        ];
    }

    /**
     * Map data row by row
     */
    public function map($submission): array
    {
        return [
            $submission->id,
            $submission->full_name,
            $submission->date_of_birth,
            $submission->place_of_birth,
            $submission->residential_address,
            $submission->occupation,
            $submission->work_address,
            $submission->phone_number,
            $submission->mobile_number,
            $submission->educational_level,
            $submission->blood_type,
            $submission->is_member_of_other_assoc ? 'نعم' : 'لا',
            $submission->other_assoc_name,
            $submission->other_assoc_address,
            match ($submission->status) {
                'accepted' => 'مقبول',
                'rejected' => 'مرفوض',
                default => 'قيد المراجعة',
            },
            $submission->decision_number,
            $submission->board_meeting_date,
            $submission->submission_location,
            $submission->submission_date,
            $submission->doc_id_copy ? 'مرفق' : 'غير مرفق',
            $submission->doc_judicial_record ? 'مرفق' : 'غير مرفق',
            $submission->doc_degree_copy ? 'مرفق' : 'غير مرفق',
            $submission->doc_photos ? 'مرفق' : 'غير مرفق',
            $submission->created_at?->toDateTimeString(),
        ];
    }

    /**
     * Ensure correct encoding for Arabic characters in CSV export
     */
    public function getCsvSettings(): array
    {
        return [
            'use_bom' => true,
        ];
    }
}