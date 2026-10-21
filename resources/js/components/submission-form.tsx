import React, { FormEvent, MouseEvent, ChangeEvent, useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { store } from '@/routes/submissions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';

interface PageProps {
  flash?: {
    success?: string;
  };
  errors: Record<string, string>;
}

export default function SubmissionForm() {
  const { flash } = usePage<PageProps>().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: '',
    place_of_birth: '',
    date_of_birth: '',
    residential_address: '',
    occupation: '',
    work_address: '',
    phone_number: '',
    mobile_number: '',
    educational_level: '',
    blood_type: '',
    is_member_of_other_assoc: false,
    other_assoc_name: '',
    other_assoc_address: '',
    // Document File Uploads
    doc_id_copy: null as File | null,
    doc_judicial_record: null as File | null,
    doc_degree_copy: null as File | null,
    doc_photos: [] as File[],
    submission_location: 'طرابلس',
    submission_date: new Date().toISOString().split('T')[0],
  });

  // Track image preview URLs
  const [previews, setPreviews] = useState<Record<string, string | string[]>>({});

  // Hidden Input Refs
  const idCopyRef = useRef<HTMLInputElement>(null);
  const judicialRef = useRef<HTMLInputElement>(null);
  const degreeRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<HTMLInputElement>(null);

  const handleSingleFileChange = (field: 'doc_id_copy' | 'doc_judicial_record' | 'doc_degree_copy') => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData(field, file);

      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviews((prev) => ({ ...prev, [field]: url }));
      } else {
        setPreviews((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  };

  const removeSingleFile = (field: 'doc_id_copy' | 'doc_judicial_record' | 'doc_degree_copy') => {
    setData(field, null);
    if (typeof previews[field] === 'string') {
      URL.revokeObjectURL(previews[field] as string);
      setPreviews((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhotosChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 2 - data.doc_photos.length);
      const updatedFiles = [...data.doc_photos, ...selectedFiles].slice(0, 2);

      setData('doc_photos', updatedFiles);

      const newPreviewUrls = updatedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => ({ ...prev, doc_photos: newPreviewUrls }));
    }
  };

  const removePhoto = (index: number) => {
    const updatedFiles = data.doc_photos.filter((_, i) => i !== index);
    setData('doc_photos', updatedFiles);

    const currentPreviews = previews.doc_photos as string[] || [];
    if (currentPreviews[index]) {
      URL.revokeObjectURL(currentPreviews[index]);
    }

    const updatedPreviews = currentPreviews.filter((_, i) => i !== index);
    setPreviews((prev) => ({ ...prev, doc_photos: updatedPreviews }));
  };

  const handleSubmit = (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    post(store.url(), {
      forceFormData: true,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        setPreviews({});
      },
    });
  };

  return (
      <div className="max-w-3xl mx-auto my-12 px-4" dir="rtl">
        <Card className="border-border shadow-xs rounded-lg">
          <CardHeader className="text-center border-b pb-6 space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              طلب إنتساب
            </CardTitle>
            <CardDescription className="text-sm font-normal text-muted-foreground pt-1">
              يرجى تعبئة كافة البيانات المطلوبة وإرفاق المستندات اللازمة لاستكمال طلب الإنتساب.
            </CardDescription>
            <Link href={'/'} className={'text-xs text-muted-foreground hover:text-foreground transition-colors pt-2 block'}>
              العودة إلى الصفحة الرئيسية
            </Link>
          </CardHeader>

          {flash?.success && (
              <div className="p-6 pb-0">
                <Alert className="border-emerald-600/30 bg-emerald-50 text-emerald-900 rounded-md">
                  <AlertDescription className="font-medium">{flash.success}</AlertDescription>
                </Alert>
              </div>
          )}

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* Section 1: Personal Info */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">المعلومات الشخصية</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="full_name" className="text-xs font-medium">
                      الإسم الثلاثي <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="full_name"
                        placeholder="أدخل إسمك الكامل مع إسم الأب والعائلة"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                    />
                    {errors.full_name && (
                        <p className="text-destructive text-xs">{errors.full_name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="place_of_birth" className="text-xs font-medium">مكان الولادة</Label>
                    <Input
                        id="place_of_birth"
                        placeholder="مثال: طرابلس - التل"
                        value={data.place_of_birth}
                        onChange={(e) => setData('place_of_birth', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="date_of_birth" className="text-xs font-medium">تاريخ الميلاد</Label>
                    <Input
                        id="date_of_birth"
                        type="date"
                        value={data.date_of_birth}
                        onChange={(e) => setData('date_of_birth', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="residential_address" className="text-xs font-medium">عنوان السكن</Label>
                    <Input
                        id="residential_address"
                        placeholder="المنطقة، الشارع، البناية، الطابق"
                        value={data.residential_address}
                        onChange={(e) => setData('residential_address', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="occupation" className="text-xs font-medium">المهنة</Label>
                    <Input
                        id="occupation"
                        placeholder="مثال: مهندس، مهندس معماري، تاجر"
                        value={data.occupation}
                        onChange={(e) => setData('occupation', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="work_address" className="text-xs font-medium">عنوان العمل</Label>
                    <Input
                        id="work_address"
                        placeholder="المنطقة، اسم الشارع أو الشركة"
                        value={data.work_address}
                        onChange={(e) => setData('work_address', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone_number" className="text-xs font-medium">رقم الهاتف</Label>
                    <Input
                        id="phone_number"
                        type="tel"
                        placeholder="06/XXXXXX"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="mobile_number" className="text-xs font-medium">رقم الخلوي</Label>
                    <Input
                        id="mobile_number"
                        type="tel"
                        placeholder="70/XXXXXX أو 03/XXXXXX"
                        value={data.mobile_number}
                        onChange={(e) => setData('mobile_number', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="educational_level" className="text-xs font-medium">التحصيل العلمي</Label>
                    <Input
                        id="educational_level"
                        placeholder="مثال: إجازة جامعية، ماجستير، ثانوي"
                        value={data.educational_level}
                        onChange={(e) => setData('educational_level', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="blood_type" className="text-xs font-medium">فئة الدم</Label>
                    <Select
                        value={data.blood_type}
                        onValueChange={(val) => setData('blood_type', val)}
                    >
                      <SelectTrigger id="blood_type">
                        <SelectValue placeholder="اختر فئة الدم" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 2: Other Association */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">العضوية في جمعيات أخرى</h3>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-reverse">
                    <Checkbox
                        id="is_member_of_other_assoc"
                        checked={data.is_member_of_other_assoc}
                        onCheckedChange={(checked) =>
                            setData('is_member_of_other_assoc', checked === true)
                        }
                    />
                    <Label
                        htmlFor="is_member_of_other_assoc"
                        className="ms-2 text-sm font-normal cursor-pointer"
                    >
                      هل أنت منتسب إلى جمعية أخرى؟
                    </Label>
                  </div>

                  {data.is_member_of_other_assoc && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="other_assoc_name" className="text-xs font-medium">إسم الجمعية</Label>
                          <Input
                              id="other_assoc_name"
                              placeholder="أدخل اسم الجمعية المنتسب إليها"
                              value={data.other_assoc_name}
                              onChange={(e) => setData('other_assoc_name', e.target.value)}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="other_assoc_address" className="text-xs font-medium">عنوان الجمعية</Label>
                          <Input
                              id="other_assoc_address"
                              placeholder="عنوان مقّر الجمعية"
                              value={data.other_assoc_address}
                              onChange={(e) => setData('other_assoc_address', e.target.value)}
                          />
                        </div>
                      </div>
                  )}
                </div>
              </div>

              {/* Section 3: Declaration Text */}
              <div className="p-4 bg-muted/30 rounded-md border border-border/60 text-xs text-muted-foreground leading-relaxed">
                بعد اطلاعي على النظام الأساسي والداخلي لجمعية &quot;تجمع عائلات طرابلس والشمال&quot;، أرجو قبول إنتسابي إلى جمعيتكم. وإني أتعهد بالعمل على تطبيق الأهداف والغايات والتقيد بأنظمة الجمعية والإلتزام بالقرارات الصادرة عنها.
              </div>

              {/* Section 4: Document Upload Buttons */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">المستندات المرفقة</h3>
                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 1. Identity Copy */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium block">
                      1- صورة عن الهوية أو إخراج القيد
                    </Label>
                    <input
                        ref={idCopyRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={handleSingleFileChange('doc_id_copy')}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => idCopyRef.current?.click()}
                          className="text-xs"
                      >
                        <Upload className="size-3.5 me-1.5" />
                        رفع المستند
                      </Button>
                      {data.doc_id_copy && (
                          <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                            {data.doc_id_copy.name}
                          </span>
                      )}
                    </div>
                    {typeof previews.doc_id_copy === 'string' && (
                        <div className="relative size-16 mt-2 rounded-md overflow-hidden border border-border">
                          <img src={previews.doc_id_copy} alt="Preview" className="size-full object-cover" />
                          <button
                              type="button"
                              onClick={() => removeSingleFile('doc_id_copy')}
                              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                    )}
                    {errors.doc_id_copy && <p className="text-destructive text-xs">{errors.doc_id_copy}</p>}
                  </div>

                  {/* 2. Judicial Record */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium block">
                      2- سجل عدلي جديد
                    </Label>
                    <input
                        ref={judicialRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={handleSingleFileChange('doc_judicial_record')}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => judicialRef.current?.click()}
                          className="text-xs"
                      >
                        <Upload className="size-3.5 me-1.5" />
                        رفع المستند
                      </Button>
                      {data.doc_judicial_record && (
                          <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                            {data.doc_judicial_record.name}
                          </span>
                      )}
                    </div>
                    {typeof previews.doc_judicial_record === 'string' && (
                        <div className="relative size-16 mt-2 rounded-md overflow-hidden border border-border">
                          <img src={previews.doc_judicial_record} alt="Preview" className="size-full object-cover" />
                          <button
                              type="button"
                              onClick={() => removeSingleFile('doc_judicial_record')}
                              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                    )}
                    {errors.doc_judicial_record && <p className="text-destructive text-xs">{errors.doc_judicial_record}</p>}
                  </div>

                  {/* 3. Degree Copy */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium block">
                      3- صورة عن الشهادة العلمية
                    </Label>
                    <input
                        ref={degreeRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={handleSingleFileChange('doc_degree_copy')}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => degreeRef.current?.click()}
                          className="text-xs"
                      >
                        <Upload className="size-3.5 me-1.5" />
                        رفع المستند
                      </Button>
                      {data.doc_degree_copy && (
                          <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                            {data.doc_degree_copy.name}
                          </span>
                      )}
                    </div>
                    {typeof previews.doc_degree_copy === 'string' && (
                        <div className="relative size-16 mt-2 rounded-md overflow-hidden border border-border">
                          <img src={previews.doc_degree_copy} alt="Preview" className="size-full object-cover" />
                          <button
                              type="button"
                              onClick={() => removeSingleFile('doc_degree_copy')}
                              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                    )}
                    {errors.doc_degree_copy && <p className="text-destructive text-xs">{errors.doc_degree_copy}</p>}
                  </div>

                  {/* 4. Two Personal Photos (Unified Field) */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium block">
                      4- صورتان شمسيتان لطالب الإنتساب (حد أقصى 2)
                    </Label>
                    <input
                        ref={photosRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotosChange}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={data.doc_photos.length >= 2}
                          onClick={() => photosRef.current?.click()}
                          className="text-xs"
                      >
                        <ImageIcon className="size-3.5 me-1.5" />
                        رفع الصور ({data.doc_photos.length}/2)
                      </Button>
                    </div>

                    {Array.isArray(previews.doc_photos) && previews.doc_photos.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {previews.doc_photos.map((src, idx) => (
                              <div key={idx} className="relative size-16 rounded-md overflow-hidden border border-border">
                                <img src={src} alt={`Photo ${idx + 1}`} className="size-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(idx)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                                >
                                  <X className="size-3" />
                                </button>
                              </div>
                          ))}
                        </div>
                    )}
                    {errors.doc_photos && <p className="text-destructive text-xs">{errors.doc_photos}</p>}
                  </div>
                </div>
              </div>

              {/* Section 5: Date and Place */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="submission_location" className="text-xs font-medium">موقع التقديم</Label>
                  <Input
                      id="submission_location"
                      placeholder="مثال: طرابلس"
                      value={data.submission_location}
                      onChange={(e) => setData('submission_location', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="submission_date" className="text-xs font-medium">تاريخ التقديم</Label>
                  <Input
                      id="submission_date"
                      type="date"
                      value={data.submission_date}
                      onChange={(e) => setData('submission_date', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 sm:p-8 pt-0">
              <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full h-10 text-sm font-medium"
              >
                {processing ? (
                    <>
                      <Loader2 className="size-4 animate-spin ml-2" />
                      <span>جاري الإرسال...</span>
                    </>
                ) : (
                    'تقديم الطلب'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
}