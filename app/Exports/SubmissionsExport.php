<?php

namespace App\Exports;

use App\Models\Submission;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SubmissionsExport implements FromCollection, WithHeadings, WithMapping, WithCustomCsvSettings, ShouldAutoSize, WithStyles, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection(): \Illuminate\Support\Enumerable
    {
        return Submission::all();
    }

    /**
     * Headings for the export columns
     */
    public function headings(): array
    {
        return [
            'المعرف (ID)',
            'الإسم الثلاثي',
            'مكان الولادة',
            'رقم السجل',
            'تاريخ الميلاد',
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
            'صورة الهوية/إخراج قيد',
            'حالة الطلب',
            'رقم القرار',
            'تاريخ جلسة الهيئة',
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
            $submission->place_of_birth,
            $submission->civil_registry_number,
            $submission->date_of_birth?->format('Y-m-d'),
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
            $submission->doc_id_copy ? 'مرفق' : 'غير مرفق',
            match ($submission->status) {
                'accepted' => 'مقبول',
                'rejected' => 'مرفوض',
                default => 'قيد المراجعة',
            },
            $submission->decision_number,
            $submission->board_meeting_date?->format('Y-m-d'),
            $submission->created_at?->toDateTimeString(),
        ];
    }

    /**
     * Define custom row/cell styles
     */
    public function styles(Worksheet $sheet): array
    {
        return [
            // Style Header Row
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF'],
                    'size' => 11,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '1F2937'],
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
            ],
        ];
    }

    /**
     * Set sheet-level configurations (RTL layout, gridlines, auto-padding, borders)
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                $highestColumn = $sheet->getHighestColumn();
                $highestRow = $sheet->getHighestRow();

                // Set Right-To-Left direction for Arabic Excel readers
                $sheet->setRightToLeft(true);

                // Set Header row height
                $sheet->getRowDimension(1)->setRowHeight(32);

                // Apply styling to all data cells
                $fullRange = "A1:{$highestColumn}{$highestRow}";

                $sheet->getStyle($fullRange)->applyFromArray([
                    'alignment' => [
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => 'E5E7EB'], // Light gray borders
                        ],
                    ],
                ]);

                // Set minimum width for auto-sized columns so they don't look cramped
                foreach (range('A', $highestColumn) as $col) {
                    $currentWidth = $sheet->getColumnDimension($col)->getWidth();
                    if ($currentWidth < 15) {
                        $sheet->getColumnDimension($col)->setWidth(16);
                    }
                }
            },
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