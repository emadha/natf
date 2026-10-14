import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Form() {
  return (
      <form dir="rtl" className={'space-y-6 border border-border p-10 rounded-xl max-w-lg mx-auto text-right'}>
        <div>
          <h2 className="text-xl font-semibold">الملف الشخصي والتفضيلات</h2>
          <p className="text-sm text-muted-foreground">يرجى تحديث بيانات حسابك وإعداداتك.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input id="name" placeholder="محمد أحمد" defaultValue="سارة السعيد" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" placeholder="example@domain.com" defaultValue="sara.alsaeed@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input id="phone" type="tel" placeholder="+966 50 000 0000" defaultValue="+966 55 123 4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">الشركة</Label>
            <Input id="company" placeholder="اسم الشركة" defaultValue="حلول التقنية للابتكار" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">المسمى الوظيفي</Label>
            <Input id="role" placeholder="مهندس برمجيات" defaultValue="كبير مصممي المنتجات" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">الموقع الإلكتروني</Label>
            <Input id="website" type="url" placeholder="https://example.com" defaultValue="https://sara.design" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">نبذة شخصية</Label>
            <textarea
                id="bio"
                className={'w-full border p-4 rounded-lg bg-background text-foreground text-sm resize-y'}
                rows={3}
                placeholder="اكتب نبذة قصيرة عنك..."
                defaultValue="شغوفة بالتصميم مع خبرة تزيد عن 8 سنوات في بناء المنتجات الرقمية وأنظمة التصميم القابلة للتوسع."
            />
          </div>
        </div>

        <div className={'flex w-full justify-end items-center gap-4'}>
          <Button type="button" variant="outline">إلغاء</Button>
          <Button type="submit">حفظ التغييرات</Button>
        </div>
      </form>
  );
}