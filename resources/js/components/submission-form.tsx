import React, { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { store } from '@/routes/submissions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2, Plus, Upload, X } from 'lucide-react';

interface PageProps {
  flash?: {
    success?: string;
  };
  errors: Record<string, string>;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <Separator />
        {children}
      </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function FormField({ id, label, required = true, error, className = '', children }: FormFieldProps) {
  return (
      <div className={`space-y-1.5 ${className}`}>
        <Label htmlFor={id} className="text-base font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {children}
        {error && <p className="text-destructive text-xs font-bold">{error}</p>}
      </div>
  );
}

interface FileInputProps {
  label: string;
  file: File | null;
  previewUrl?: string;
  error?: string;
  required?: boolean;
  accept?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

function FileInput({
  label,
  file,
  previewUrl,
  error,
  required = true,
  accept = 'image/*,.pdf',
  inputRef,
  onFileChange,
  onRemoveFile,
}: FileInputProps) {
  return (
      <div className="space-y-2">
        <Label className="text-sm font-medium block">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={onFileChange}
        />
        <div className="flex items-center gap-3">
          <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="text-xs"
          >
            <Upload className="size-3.5 me-1.5" />
            رفع المستند
          </Button>
          {file && (
              <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                {file.name}
              </span>
          )}
        </div>

        {previewUrl && (
            <div className="relative size-16 mt-2 rounded-md overflow-hidden border border-border">
              <img src={previewUrl} alt="Preview" className="size-full object-cover" />
              <button
                  type="button"
                  onClick={onRemoveFile}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
              >
                <X className="size-3" />
              </button>
            </div>
        )}
        {error && <p className="text-destructive text-xs font-bold">{error}</p>}
      </div>
  );
}

export default function SubmissionForm() {
  const { flash } = usePage<PageProps>().props;
  const [submitted, setSubmitted] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: '',
    place_of_birth: '',
    civil_registry_number: '',
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
    doc_id_copy: null as File | null,
  });

  const [previews, setPreviews] = useState<Record<string, string>>({});
  const idCopyRef = useRef<HTMLInputElement>(null);

  const handleSingleFileChange = (field: 'doc_id_copy') => (e: ChangeEvent<HTMLInputElement>) => {
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

  const removeSingleFile = (field: 'doc_id_copy') => {
    setData(field, null);
    if (previews[field]) {
      URL.revokeObjectURL(previews[field]);
      setPreviews((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
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
        setSubmitted(true);
      },
    });
  };

  const handleResetForm = () => {
    setSubmitted(false);
  };

  // Render Success Message View
  if (submitted || flash?.success) {
    return (
        <div className="max-w-xl mx-auto py-12" dir="rtl">
          <Card className="text-center p-8 border-emerald-500/20 bg-emerald-500/5 shadow-md">
            <CardContent className="space-y-4 pt-6">
              <div className="mx-auto size-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">تم تقديم الطلب بنجاح!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
                {flash?.success || 'شكراً لك، تم استلام طلب الإنتساب الخاص بك وسوف تقوم الهيئة الإدارية بمراجعته والتواصل معك في أقرب وقت.'}
              </p>
            </CardContent>
            <CardFooter className="justify-center pt-4">
              <Button onClick={handleResetForm} variant="outline" className="gap-2">
                <Plus className="size-4" />
                تقديم طلب إنتساب آخر
              </Button>
            </CardFooter>
          </Card>
        </div>
    );
  }

  return (
      <div className="max-w-3xl mx-auto" dir="rtl">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Section 1: Personal Info */}
            <FormSection title="المعلومات الشخصية">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    id="full_name"
                    label="الإسم الثلاثي"
                    required
                    error={errors.full_name}
                    className="md:col-span-3"
                >
                  <Input
                      id="full_name"
                      placeholder="أدخل إسمك الكامل مع إسم الأب والعائلة"
                      value={data.full_name}
                      onChange={(e) => setData('full_name', e.target.value)}
                  />
                </FormField>

                <FormField id="place_of_birth" label="مكان الولادة" required error={errors.place_of_birth}>
                  <Input
                      id="place_of_birth"
                      placeholder="مثال: طرابلس التل"
                      value={data.place_of_birth}
                      onChange={(e) => setData('place_of_birth', e.target.value)}
                  />
                </FormField>

                <FormField id="civil_registry_number" label="رقم السجل" required error={errors.civil_registry_number}>
                  <Input
                      id="civil_registry_number"
                      placeholder="مثال: 124"
                      value={data.civil_registry_number}
                      onChange={(e) => setData('civil_registry_number', e.target.value)}
                  />
                </FormField>

                <FormField id="date_of_birth" label="تاريخ الميلاد" required error={errors.date_of_birth}>
                  <Input
                      id="date_of_birth"
                      type="date"
                      value={data.date_of_birth}
                      onChange={(e) => setData('date_of_birth', e.target.value)}
                  />
                </FormField>

                <FormField id="residential_address" label="عنوان السكن" required error={errors.residential_address} className="md:col-span-3">
                  <Input
                      id="residential_address"
                      placeholder="المنطقة، الشارع، البناية، الطابق"
                      value={data.residential_address}
                      onChange={(e) => setData('residential_address', e.target.value)}
                  />
                </FormField>

                <FormField id="occupation" label="المهنة" required error={errors.occupation} className="md:col-span-1.5">
                  <Input
                      id="occupation"
                      placeholder="مثال: مهندس، تاجر"
                      value={data.occupation}
                      onChange={(e) => setData('occupation', e.target.value)}
                  />
                </FormField>

                <FormField id="work_address" label="عنوان العمل" required error={errors.work_address} className="md:col-span-1.5">
                  <Input
                      id="work_address"
                      placeholder="المنطقة، اسم الشارع أو الشركة"
                      value={data.work_address}
                      onChange={(e) => setData('work_address', e.target.value)}
                  />
                </FormField>

                <FormField id="phone_number" label="رقم الهاتف" required error={errors.phone_number}>
                  <Input
                      id="phone_number"
                      type="tel"
                      placeholder="06/XXXXXX"
                      value={data.phone_number}
                      onChange={(e) => setData('phone_number', e.target.value)}
                  />
                </FormField>

                <FormField id="mobile_number" label="رقم الخلوي" required error={errors.mobile_number}>
                  <Input
                      id="mobile_number"
                      type="tel"
                      placeholder="70/XXXXXX"
                      value={data.mobile_number}
                      onChange={(e) => setData('mobile_number', e.target.value)}
                  />
                </FormField>

                <FormField id="educational_level" label="التحصيل العلمي" required error={errors.educational_level}>
                  <Input
                      id="educational_level"
                      placeholder="مثال: إجازة جامعية"
                      value={data.educational_level}
                      onChange={(e) => setData('educational_level', e.target.value)}
                  />
                </FormField>

                <FormField id="blood_type" label="فئة الدم" required error={errors.blood_type}>
                  <Select value={data.blood_type} onValueChange={(val) => setData('blood_type', val)}>
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
                </FormField>
              </div>
            </FormSection>

            {/* Section 2: Other Association */}
            <FormSection title="العضوية في جمعيات أخرى">
              <div className="space-y-4">
                <div className="flex items-center space-x-reverse">
                  <Checkbox
                      id="is_member_of_other_assoc"
                      checked={data.is_member_of_other_assoc}
                      onCheckedChange={(checked) => setData('is_member_of_other_assoc', checked === true)}
                  />
                  <Label htmlFor="is_member_of_other_assoc" className="ms-2 text-sm font-normal cursor-pointer">
                    هل أنت منتسب إلى جمعية أخرى؟
                  </Label>
                </div>

                {data.is_member_of_other_assoc && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <FormField id="other_assoc_name" label="إسم الجمعية" required error={errors.other_assoc_name}>
                        <Input
                            id="other_assoc_name"
                            placeholder="أدخل اسم الجمعية المنتسب إليها"
                            value={data.other_assoc_name}
                            onChange={(e) => setData('other_assoc_name', e.target.value)}
                        />
                      </FormField>

                      <FormField id="other_assoc_address" label="عنوان الجمعية" required error={errors.other_assoc_address}>
                        <Input
                            id="other_assoc_address"
                            placeholder="عنوان مقّر الجمعية"
                            value={data.other_assoc_address}
                            onChange={(e) => setData('other_assoc_address', e.target.value)}
                        />
                      </FormField>
                    </div>
                )}
              </div>
            </FormSection>

            {/* Section 3: Declaration Text */}
            <div className="p-4 bg-muted/30 rounded-md border border-border/60 text-xs text-muted-foreground leading-relaxed">
              بعد اطلاعي على النظام الأساسي والداخلي لجمعية &quot;تجمع عائلات طرابلس والشمال&quot;، أرجو قبول إنتسابي إلى جمعيتكم. وإني أتعهد بالعمل على تطبيق الأهداف والغايات والتقيد بأنظمة الجمعية والإلتزام بالقرارات الصادرة عنها.
            </div>

            {/* Section 4: Document Uploads */}
            <FormSection title="المستندات المرفقة">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FileInput
                    label="1- صورة عن الهوية أو إخراج القيد"
                    required
                    file={data.doc_id_copy}
                    previewUrl={previews.doc_id_copy}
                    error={errors.doc_id_copy}
                    inputRef={idCopyRef}
                    onFileChange={handleSingleFileChange('doc_id_copy')}
                    onRemoveFile={() => removeSingleFile('doc_id_copy')}
                />
              </div>
            </FormSection>
          </CardContent>

          <CardFooter className="p-6 sm:p-8 pt-0">
            <Button type="button" onClick={handleSubmit} disabled={processing} className="w-full h-10 text-sm font-medium">
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
      </div>
  );
}