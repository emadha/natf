import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Landmark, Shield, Users, LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    icon: Users,
    title: 'وحدة الصف والتكافل',
    description: 'جمع كلمة عائلات طرابلس والشمال وتعزيز الروابط الاجتماعية بين أبنائها.',
  },
  {
    icon: Heart,
    title: 'الرعاية الاجتماعية',
    description: 'تقديم الدعم والمساعدة للأسر المتعففة وتطوير المبادرات الخيرية المحلية.',
  },
  {
    icon: Landmark,
    title: 'التنمية والتطوير',
    description: 'متابعة المشاريع التنموية والتاريخية التي تخدم طرابلس والشمال.',
  },
  {
    icon: Shield,
    title: 'تمثيل الحقوق',
    description: 'إيصال صوت العائلات والعمل المستمر على تحسين الخدمات العامة.',
  },
];

function PillarCard({ icon: Icon, title, description }: Pillar) {
  return (
      <Card className="border-border/60 shadow-2xs">
        <CardContent className="p-5 flex items-start space-x-reverse">
          <div className="px-2 me-2 rounded-lg text-primary shrink-0">
            <Icon className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
  );
}

export default function Welcome() {
  return (
      <>
        <div className="w-full max-w-4xl space-y-12 my-6">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-6 pt-4">
            <div className="w-48 h-48 sm:w-56 sm:h-56 overflow-hidden rounded-2xl flex items-center justify-center">
              <img
                  src="/logo.jpeg"
                  alt="تجمع عائلات طرابلس والشمال"
                  className="w-full h-full object-cover"
              />
            </div>


          </div>

          {/* Mission Statement Box */}
          <Card className="border-border/60 shadow-2xs bg-card backdrop-blur-xs">
            <CardContent className="p-6 sm:p-8 text-center space-y-2">
              <h2 className="text-lg font-semibold text-foreground">رسالتنا</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                يسعى تجمع عائلات طرابلس والشمال إلى تعزيز أواصر المحبة والتعاون بين أبناء المدينة والجوار، وتقديم الرعاية الاجتماعية والصحية والتعليمية للأسر، والعمل كدستور مدني يمثل تطلعات الأهالي في بناء مستقبل أفضل.
              </p>
            </CardContent>
          </Card>

          {/* Key Pillars / Objectives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
                <PillarCard
                    key={pillar.title}
                    icon={pillar.icon}
                    title={pillar.title}
                    description={pillar.description}
                />
            ))}
          </div>
        </div>
      </>
  );
}