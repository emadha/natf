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
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'place_of_birth' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'residential_address' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'work_address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:50',
            'mobile_number' => 'nullable|string|max:50',
            'educational_level' => 'nullable|string|max:255',
            'blood_type' => 'nullable|string|max:5',
            'is_member_of_other_assoc' => 'boolean',
            'other_assoc_name' => 'nullable|string|max:255',
            'other_assoc_address' => 'nullable|string|max:255',
            'doc_id_copy' => 'boolean',
            'doc_judicial_record' => 'boolean',
            'doc_degree_copy' => 'boolean',
            'doc_photos' => 'boolean',
            'submission_location' => 'required|string|max:255',
            'submission_date' => 'required|date',
        ]);

        Submission::create($validated);

        return redirect()->back()->with('success', 'تم تقديم طلب الإنتساب بنجاح!');
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Submissions/Create', [
            'title' => 'طلب الإنتساب'
        ]);
    }

    /**
     * @return BinaryFileResponse
     */
    public function export()
    {
        return Excel::download(new SubmissionsExport, 'membership_applications.xlsx');
    }
}
