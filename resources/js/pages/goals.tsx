import React from 'react';
import PageContainer from '@/pages/layouts/page-container';
import {
  HeartPulse,
  GraduationCap,
  TrendingUp,
  Leaf,
  Users,
  Scale,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

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

  // Motion variants
  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 120,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
      <PageContainer title="أهداف التجمع">
        <div className="mx-auto max-w-5xl space-y-16 text-right" dir="rtl">
          {/* Intro text */}
          <motion.p
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg"
          >
            يسعى تجمع عائلات طرابلس والشمال إلى تحقيق رؤية شاملة للنهوض بالمجتمع
            وتعزيز حقوق أفراده وتطوير قدراتهم عبر الأهداف الاستراتيجية التالية:
          </motion.p>

          {/* Goal Sections */}
          <div className="space-y-28">
            {goalSections.map((section, sIndex) => {
              const SectionIcon = section.icon;
              return (
                  <section key={sIndex} className="space-y-6">
                    {/* Category Header */}
                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="flex items-center gap-3 border-b border-border/60 pb-4"
                    >
                      <motion.div
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-xs"
                      >
                        <SectionIcon className="w-6 h-6" />
                      </motion.div>
                      <h2 className="font-bold md:text-3xl text-foreground tracking-tight">
                        {section.category}
                      </h2>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        variants={gridContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2"
                    >
                      {section.items.map((item, iIndex) => (
                          <motion.div
                              key={iIndex}
                              variants={cardVariants}
                              whileHover={{
                                y: -6,
                                transition: { duration: 0.2, ease: 'easeOut' },
                              }}
                              whileTap={{ scale: 0.98 }}
                              className="p-6 rounded-2xl bg-card/60 select-none border border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-colors duration-300 space-y-3 group"
                          >
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                      ))}
                    </motion.div>
                  </section>
              );
            })}
          </div>
        </div>
      </PageContainer>
  );
}