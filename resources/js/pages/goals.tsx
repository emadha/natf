import React from 'react';
import PageContainer from '@/pages/layouts/page-container';
import { Link } from '@inertiajs/react';
import {
  HeartPulse,
  GraduationCap,
  TrendingUp,
  Leaf,
  Users,
  Scale,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Goals() {
  const goalSections = [
    {
      category: 'أولاً: الأهداف الاجتماعية والصحية',
      icon: HeartPulse,
      items: [
        {
          title: 'الرعاية الصحية',
          description:
              'السعي لإنشاء مستشفيات خيرية مجانية، والعمل على إصدار بطاقات استشفائية تُمكن المواطن من دخول المستشفى دون تحمل أعباء مالية طائلة.',
        },
        {
          title: 'دعم الشرائح الفقيرة',
          description:
              'الدفاع عن حقوق العمال والكسبة، والوقوف إلى جانب الشرائح الفقيرة وذوي الدخل المحدود في ظل الظروف الاقتصادية الصعبة.',
        },
        {
          title: 'التدخل الإنساني',
          description:
              'التدخل المستمر لمعالجة الأزمات اليومية التي تُمس حياة المواطن مباشرة.',
        },
      ],
    },
    {
      category: 'ثانياً: الشباب والتعليم',
      icon: GraduationCap,
      items: [
        {
          title: 'تمكين الشباب',
          description:
              'توحيد فئة الشباب من العائلات الطرابلسية والشمالية، وخلق برامج لتطوير طاقاتهم وإمكاناتهم في لبنان.',
        },
        {
          title: 'التوجيه الأكاديمي',
          description:
              'وضع برنامج لمتابعة الطلاب في الجامعات وتأهيل الطالب وتوجيهه قبل دخوله إلى المرحلة الجامعية.',
        },
        {
          title: 'دعم التعليم الرسمي',
          description:
              'متابعة شؤون المدارس والجامعات الرسمية في الشمال لضمان حقوق الطلاب وأساتذة التعليم الأساسي والعالي.',
        },
      ],
    },
    {
      category: 'ثالثاً: التنمية الاقتصادية واستثمار طاقات الشمال',
      icon: TrendingUp,
      items: [
        {
          title: 'تفعيل المرافق الحيوية',
          description:
              'المطالبة بتفعيل دور المرافق الأساسية في طرابلس والشمال التي تشكل ركيزة للاقتصاد الوطني مثل معرض رشيد كرامي الدولي، مرفأ طرابلس، المنطقة الاقتصادية، مطار القليعات، وغيرها من المشاريع.',
        },
        {
          title: 'تشجيع الاستثمارات',
          description:
              'المطالبة بتوفير بيئة جاذبة للاستثمارات الداخلية والخارجية، وخلق فرص عمل للشباب الشمالي للحد من هجرتهم.',
        },
        {
          title: 'التنمية والمطالبة بالحقوق',
          description:
              'السعي الدائم لرفع الحرمان المزمن عن طرابلس ومختلف مناطق الشمال عبر المطالبة بالمشاريع الحيوية والتنموية.',
        },
      ],
    },
    {
      category: 'رابعاً: البيئة والتراث',
      icon: Leaf,
      items: [
        {
          title: 'حماية البيئة',
          description:
              'التصدي لأي مشاريع أو حلول بيئية غير مدروسة مثل المكبات العشوائية، المطامر البحرية، أو المحارق والتي تهدد صحة السكان والسلامة العامة.',
        },
        {
          title: 'إدارة النفايات المستدامة',
          description:
              'المطالبة بخطط علمية وبيئية صحيحة لإدارة النفايات — كالفرز من المصدر والتدوير — بعيداً عن الحلول المؤقتة التي تضر بالثروة السمكية وواجهة المدينة البحرية.',
        },
        {
          title: 'الحفاظ على التراث',
          description:
              'إبراز الوجه الحضاري والتاريخي والثقافي لمدينة طرابلس كونها عاصمة لبنان الثانية و " مدينة العلم والعلماء " مع العمل على صيانة معالمها الأثرية والتراثية.',
        },
      ],
    },
    {
      category: 'خامساً: السلم الأهلي والعمل المجتمعي',
      icon: Users,
      items: [
        {
          title: 'توحيد الصفوف',
          description:
              'توحيد صفوف العائلات والفعاليات والروابط الأهلية والبلدية في الشمال لخلق قوة ضغط مجتمعية إيجابية.',
        },
        {
          title: 'تعزيز السلم الأهلي',
          description:
              'حماية الاستقرار عبر التواصل المستمر مع المرجعيات الرسمية والأمنية والقضائية لدعم استقرار المنطقة لتعزيز العيش المشترك ودرء الفتن.',
        },
      ],
    },
    {
      category: 'سادساً: الأهداف الحقوقية والقانونية',
      icon: Scale,
      items: [
        {
          title: 'مكافحة الفساد',
          description:
              'رفع الصوت بوجه أي هدر أو تقصير في المشاريع العامة التي تخص المنطقة والمطالبة بالشفافية والمحاسبة عبر القنوات القانونية والإدارية.',
        },
        {
          title: 'المتابعة القانونية',
          description:
              'متابعة قضايا الموقوفين والتدخل في الملفات الإنسانية والقانونية الحساسة بالتنسيق مع المرجعيات القضائية والروحية والسياسية لرفع الظلم وتحقيق العدالة.',
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
      <PageContainer title={'أهداف التجمع'}>
        <Link
            href={'/'}
            className={
              'text-center mb-8 text-xs text-muted-foreground hover:text-foreground transition-colors block'
            }
        >
          العودة إلى الصفحة الرئيسية
        </Link>

        <div className="mx-auto max-w-4xl space-y-12 text-right" dir="rtl">
          <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            يسعى تجمع عائلات طرابلس والشمال إلى تحقيق رؤية شاملة النهوض بالمجتمع
            وتعزيز حقوق أفراده وتطوير قدراتهم عبر الأهداف الاستراتيجية التالية:
          </motion.p>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
          >
            {goalSections.map((section, sIndex) => {
              const SectionIcon = section.icon;
              return (
                  <motion.div key={sIndex} variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <h2 className="font-bold text-xl text-foreground">
                        {section.category}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                      {section.items.map((item, iIndex) => (
                          <div
                              key={iIndex}
                              className="p-5 rounded-xl bg-card/80 border border-border/50 text-card-foreground space-y-2 hover:border-border transition-colors"
                          >
                            <h3 className="font-semibold text-base text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                      ))}
                    </div>
                  </motion.div>
              );
            })}
          </motion.div>
        </div>
      </PageContainer>
  );
}