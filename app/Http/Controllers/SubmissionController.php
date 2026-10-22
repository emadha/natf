<?php

namespace App\Http\Controllers;

use App\Exports\SubmissionsExport;
use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SubmissionController extends Controller
{
    /**
     * Store a newly created submission in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'place_of_birth' => 'required|string|max:255',
            'civil_registry_number' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'residential_address' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
            'work_address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:50',
            'mobile_number' => 'required|string|max:50',
            'educational_level' => 'required|string|max:255',
            'blood_type' => 'required|string|max:5',
            'is_member_of_other_assoc' => 'required|boolean',
            'other_assoc_name' => 'required_if:is_member_of_other_assoc,true|nullable|string|max:255',
            'other_assoc_address' => 'required_if:is_member_of_other_assoc,true|nullable|string|max:255',
            'doc_id_copy' => 'required|file|mimes:jpeg,png,jpg,pdf|max:5120',
        ], [
            // Custom Arabic Validation Messages
            'full_name.required' => 'حقل الإسم الثلاثي مطلوب.',
            'place_of_birth.required' => 'حقل مكان الولادة مطلوب.',
            'civil_registry_number.required' => 'حقل رقم السجل مطلوب.',
            'date_of_birth.required' => 'حقل تاريخ الميلاد مطلوب.',
            'date_of_birth.date' => 'يرجى إدخال تاريخ ميلاد صحيح.',
            'residential_address.required' => 'حقل عنوان السكن مطلوب.',
            'occupation.required' => 'حقل المهنة مطلوب.',
            'work_address.required' => 'حقل عنوان العمل مطلوب.',
            'phone_number.required' => 'حقل رقم الهاتف مطلوب.',
            'mobile_number.required' => 'حقل رقم الخلوي مطلوب.',
            'educational_level.required' => 'حقل التحصيل العلمي مطلوب.',
            'blood_type.required' => 'يرجى اختيار فئة الدم.',
            'other_assoc_name.required_if' => 'يرجى إدخال اسم الجمعية المنتسب إليها.',
            'other_assoc_address.required_if' => 'يرجى إدخال عنوان الجمعية المنتسب إليها.',
            'doc_id_copy.required' => 'يرجى تحميل صورة عن الهوية أو إخراج القيد.',
            'doc_id_copy.file' => 'المستند المرفق يجب أن يكون ملفاً صحيحاً.',
            'doc_id_copy.mimes' => 'يجب أن يكون المستند بصيغة (JPG, PNG, PDF).',
            'doc_id_copy.max' => 'حجم الملف يجب ألا يتجاوز 5 ميغابايت.',
        ]);

        if ($request->hasFile('doc_id_copy')) {
            $path = $request->file('doc_id_copy')->store('submissions/documents', 'public');
            $validated['doc_id_copy'] = $path;
        }

        Submission::create($validated);

        return redirect()->back()->with('success', 'تم تقديم طلب الإنتساب بنجاح!');
    }

    public function create(): Response
    {
        return Inertia::render('Submissions/Create', [
            'title' => 'طلب الإنتساب'
        ]);
    }

    public function export(): BinaryFileResponse
    {
        return Excel::download(new SubmissionsExport, 'membership_applications.xlsx');
    }
}