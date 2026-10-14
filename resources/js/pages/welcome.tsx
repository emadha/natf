import React, {useEffect, useRef, useState} from 'react';
import Form from '@/pages/components/form';
import {Link} from '@inertiajs/react';
import SocialLinks from '@/pages/components/social-links';
import {AnimatePresence, motion} from 'framer-motion';
import {Menu} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function Welcome() {
  const [showLogo, setShowLogo] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleForm = () => {
    const nextState = !showForm;
    setShowForm(nextState);

    if (nextState) {
      setTimeout(() => {
        scrollAnchorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 220);
    }
  };

  return (
      <div>
        <div className={'items-stretch z-10 bg-background shadow-xl shadow-black/1 w-screen content-stretch fixed border-b border-border flex justify-between'}>
          <div className={'px-10 hover:bg-neutral-200 transition-all cursor-pointer content-center'}><Menu/></div>
          <img src={'/logo.jpeg'} alt="Logo" className="w-20 h-20 my-1"/>
        </div>

        <div className="flex flex-col items-center justify-between pt-[10vh] px-4">
          {/* Logo Placeholder with smooth fade/scale transition */}
          <div className={'min-h-[80vh]'}>
            <div className="flex flex-wrap justify-center items-center my-6">
              <motion.div
                  animate={{scale: showForm ? 0.75 : 1}}
                  transition={{duration: 0.25}}
                  className="w-64 h-64 bg-muted overflow-hidden rounded-2xl flex items-center justify-center origin-center"
              >
                <img src={'/logo.jpeg'} alt="Logo" className="w-full h-full"/>
              </motion.div>
            </div>

            <div className={'flex items-center justify-center flex-wrap gap-y-24'}>
              <div className={'min-h-[calc(100vh-200px]'}>
                <h1 className={'text-6xl text-center'}>تجمع عائلات طرابلس والشمال</h1>
              </div>
              <div className={'w-full justify-center flex'}><Button className={'mx-auto hover:scale-150 transition-all cursor-pointer scale-140'} size={'lg'}>إنضم الينا</Button></div>
          </div>
          </div>



          {/* Menu Items with dynamic size/position transition */}
          <motion.div
              animate={{
                scale: showForm ? 0.9 : 1.15,
                y: showForm ? -10 : 0,
              }}
              transition={{duration: 0.25}}
              className={'flex justify-center gap-x-8 my-6'}
          >


            <motion.button
                onClick={toggleForm}
                animate={{fontWeight: showForm ? 700 : 500}}
                transition={{duration: 0.2}}
                className="text-foreground hover:text-primary transition-colors cursor-pointer text-lg"
            >
              طلب إستمارة
            </motion.button>
            <Link href="/goals" className="text-foreground hover:text-primary transition-colors font-medium text-lg">أهداف التجمع</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium text-lg">من نحن</Link>
          </motion.div>

          {/* Form Container */}
          <div className="w-full flex flex-col items-center justify-center">
            <AnimatePresence>
              {showForm && (
                  <motion.div
                      initial={{opacity: 0, y: 10, height: 0}}
                      animate={{opacity: 1, y: 0, height: 'auto'}}
                      exit={{opacity: 0, y: 10, height: 0}}
                      transition={{duration: 0.2}}
                      className="w-full max-w-lg overflow-hidden"
                  >
                    <Form/>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* Helper anchor ref for centering scroll */}
            <div ref={scrollAnchorRef} className="w-full h-1"/>
          </div>

          <div className={'justify-center flex items-center gap-x-3 mt-auto pt-6'}>
            <SocialLinks/>
          </div>
        </div>
      </div>
  );
}