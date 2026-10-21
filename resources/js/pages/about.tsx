import React from 'react';
import PageContainer from '@/pages/layouts/page-container';
import { Link } from '@inertiajs/react';
import { Shield, Target, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      icon: Users,
      title: 'إطار أهلي ووطني',
      description: 'يضم نخبة من الشخصيات العائلية والفاعليات وممثلي العائلات والبلدات.',
    },
    {
      icon: MapPin,
      title: 'طرابلس والشمال',
      description: 'يمثل تطلعات أهالي مدينة طرابلس ومختلف مناطق وقرى الشمال اللبناني.',
    },
    {
      icon: Target,
      title: 'متابعة شاملة',
      description: 'يهتم بالقضايا الحياتية والإنمائية والمعيشية والوطنية التي تمس حياة المواطن.',
    },
    {
      icon: Shield,
      title: 'صوت ضاغط',
      description: 'يعمل كقوة ضغط مجتمعية ومدنية للدفاع عن حقوق المنطقة ورفع الحرمان عنها.',
    },
  ];

  return (
      <PageContainer title={'من نحن'}>
        <Link
            href={'/'}
            className={
              'text-center mb-8 text-xs text-muted-foreground hover:text-foreground transition-colors block'
            }
        >
          العودة إلى الصفحة الرئيسية
        </Link>

        <div className="mx-auto max-w-3xl space-y-10 text-right" dir="rtl">
          {/* Main Briefing Box */}
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-2xl bg-card/90 border border-border/60 shadow-xs space-y-4 leading-relaxed text-foreground"
          >
            <h2 className="text-xl font-bold text-primary border-b border-border/50 pb-3">
              عن التجمع
            </h2>
            <p className="text-base sm:text-lg text-foreground/90 font-medium leading-loose">
              تجمع عائلات طرابلس والشمال هو إطار أهلي واجتماعي وطني يضم نخبة من
              الشخصيات العائلية والفاعليات والممثلين عن العائلات والبلدات في مدينة
              طرابلس ومختلف مناطق الشمال اللبناني.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
              يهدف التجمع إلى متابعة القضايا الحياتية والإنمائية والمعيشية والوطنية
              التي تخص أبناء المنطقة، ويُعتبر صوتاً ضاغطاً للمجتمع المدني والأهلي في
              الدفاع عن حقوق طرابلس والشمال.
            </p>
          </motion.div>

          {/* Pillars / Key Highlights */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                  <div
                      key={idx}
                      className="p-5 rounded-xl bg-card/60 border border-border/40 space-y-2 hover:border-border transition-colors"
                  >
                    <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
              );
            })}
          </motion.div>
        </div>
      </PageContainer>
  );
}