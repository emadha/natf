<x-mail::message>
# طلب إنتساب جديد

تم استلام طلب إنتساب جديد عبر الموقع الإلكتروني وهو بانتظار مراجعة الهيئة الإدارية.

<x-mail::panel>
    **بيانات المتقدم الرئيسي:**
    **الإسم الثلاثي:** {{ $submission->full_name }}
    **رقم الخلوي:** {{ $submission->mobile_number }}
</x-mail::panel>

## 1. المعلومات الشخصية

| البيان | التفاصيل |
| :--- | :--- |
| **الإسم الثلاثي** | {{ $submission->full_name }} |
| **تاريخ الميلاد** | {{ $submission->date_of_birth?->format('Y-m-d') }} |
| **مكان الولادة** | {{ $submission->place_of_birth }} |
| **رقم السجل** | {{ $submission->civil_registry_number }} |
| **فئة الدم** | {{ $submission->blood_type }} |
| **التحصيل العلمي** | {{ $submission->educational_level }} |
| **المهنة** | {{ $submission->occupation }} |
| **عنوان السكن** | {{ $submission->residential_address }} |
| **عنوان العمل** | {{ $submission->work_address }} |
| **رقم الهاتف** | {{ $submission->phone_number }} |
| **رقم الخلوي** | {{ $submission->mobile_number }} |

---

## 2. العضوية في جمعيات أخرى

* **منتسب لجمعية أخرى:** {{ $submission->is_member_of_other_assoc ? 'نعم' : 'لا' }}
@if($submission->is_member_of_other_assoc)
    * **إسم الجمعية:** {{ $submission->other_assoc_name }}
    * **عنوان الجمعية:** {{ $submission->other_assoc_address }}
@endif

---

## 3. المستندات المرفقة

* **صورة الهوية / إخراج القيد:** {{ $submission->doc_id_copy ? 'مرفقة في النظام' : 'غير مرفقة' }}

---

<x-mail::button :url="config('app.url') . '/admin/submissions/' . $submission->id">
    معاينة الطلب الكامل في لوحة التحكم
</x-mail::button>

مع خالص الشكر والتقدير،
**{{ config('app.name') }}**
</x-mail::message>