import React from 'react';
import PageContainer from '@/pages/layouts/page-container';
import { Link } from '@inertiajs/react';
import { Target, Users, ShieldCheck, Rocket, HeartHandshake, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Goals() {
  const goals = [
    {
      icon: Target,
      title: 'تعزيز التواصل والتعاون',
      description: 'بناء جسور التواصل المستمر بين الأعضاء والمؤسسات لتحقيق التكامل وتبادل الخبرات والمعرفة.',
    },
    {
      icon: Rocket,
      title: 'دعم المبادرات والابتكار',
      description: 'احتضان الأفكار المبتكرة والمشاريع الواعدة وتوفير البيئة المناسبة لتنميتها وتطويرها.',
    },
    {
      icon: Users,
      title: 'تمكين المجتمع المحلي',
      description: 'العمل على رفع كفاءة الكوادر وتنمية المهارات من خلال برامج تدريبية وورش عمل متخصصة.',
    },
    {
      icon: ShieldCheck,
      title: 'ترسيخ معايير الجودة',
      description: 'الالتزام بأعلى معايير الاحترافية والشفافية في جميع أنشطة التجمع ومبادراته.',
    },
    {
      icon: HeartHandshake,
      title: 'بناء شراكات استراتيجية',
      description: 'توسيع شبكة العلاقات مع الجهات الفاعلة لخدمة الأهداف المشتركة وتحقيق أثر مستدام.',
    },
    {
      icon: Compass,
      title: 'التنمية المستدامة',
      description: 'صياغة رؤى ومشاريع طويلة الأجل تسهم في تحقيق التنمية الاقتصادية والاجتماعية.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <div className="mx-auto max-w-3xl space-y-8 text-right" dir="rtl">
          <Link href={'/'} className={'text-center block w-full text-muted-foreground hover:text-foreground transition-colors'}>
            العودة
          </Link>

          <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center text-muted-foreground leading-relaxed"
          >
            يسعى التجمع إلى تحقيق مجموعة من الأهداف الاستراتيجية التي تهدف إلى النهوض بالمجتمع وتطوير قدرات أفراده ومؤسساته.
          </motion.p>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
          >
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                  <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg">{goal.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                  </motion.div>
              );
            })}
          </motion.div>
        </div>
      </PageContainer>
  );
}