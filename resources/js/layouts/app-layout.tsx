import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Menu, FileText, Target, Info } from 'lucide-react';
import Form from '@/components/submission-form';
import SocialLinks from '@/pages/components/social-links';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: React.ReactNode;
  showFormSection?: boolean;
}

export default function AppLayout({ children, showFormSection = true }: AppLayoutProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Scroll listener to toggle header styles after 50px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openFormAndScroll = () => {
    setShowForm(true);
    setIsSheetOpen(false);

    setTimeout(() => {
      scrollAnchorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 220);
  };

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
      <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
        {/* Background Image Layer */}
        {/*<div*/}
        {/*    className="scale-110 grayscale opacity-40 fixed inset-0 pointer-events-none -z-10"*/}
        {/*    style={{*/}
        {/*      backgroundImage: `url('/bg.jpeg')`,*/}
        {/*      backgroundSize: 'cover',*/}
        {/*      backgroundPosition: 'center',*/}
        {/*      backgroundRepeat: 'no-repeat',*/}
        {/*    }}*/}
        {/*/>*/}
        {/* Sticky Dynamic Header */}
        <header
            className={`z-50 w-full fixed top-0 left-0 flex justify-between items-center h-16 transition-all duration-300 ease-in-out ${
                isScrolled
                    ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-md shadow-black/5'
                    : 'bg-transparent border-b border-transparent shadow-none'
            }`}
        >
          {/* Sliding Sidebar Drawer */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <div className="px-6 h-full flex items-center hover:bg-muted/50 transition-all cursor-pointer">
                <Menu className="size-6 text-foreground" />
              </div>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col justify-between text-right p-6">
              <div>
                <SheetHeader className="text-right border-b pb-4 mb-6">
                  <SheetTitle className="text-xl font-bold text-foreground">القائمة الرئيسية</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-2">
                  <Button
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                      onClick={openFormAndScroll}
                  >
                    <FileText className="size-5 text-primary" />
                    <span>طلب إستمارة</span>
                  </Button>

                  <Button
                      asChild
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                  >
                    <Link href="/goals" onClick={() => setIsSheetOpen(false)}>
                      <Target className="size-5 text-primary" />
                      <span>أهداف التجمع</span>
                    </Link>
                  </Button>

                  <Button
                      asChild
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                  >
                    <Link href="/about" onClick={() => setIsSheetOpen(false)}>
                      <Info className="size-5 text-primary" />
                      <span>من نحن</span>
                    </Link>
                  </Button>
                </nav>
              </div>

              <div className="pt-6 border-t border-border/60 flex justify-center">
                <SocialLinks />
              </div>
            </SheetContent>
          </Sheet>

          <Link href={'/'}>
            <img src="/logo.jpeg" alt="Logo" className="h-12 w-auto my-1 ml-4 rounded-md" />
          </Link>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 pt-20 px-4 flex flex-col items-center">
          {children}

          {/* Global Nav Menu & Form Embed */}
          {showFormSection && (
              <div className="w-full max-w-4xl flex flex-col items-center my-8">
                <motion.div
                    animate={{
                      scale: showForm ? 0.95 : 1.05,
                      y: showForm ? -5 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-center gap-x-8 my-6"
                >
                  <motion.button
                      onClick={toggleForm}
                      animate={{ fontWeight: showForm ? 700 : 500 }}
                      transition={{ duration: 0.2 }}
                      className="text-foreground hover:text-primary transition-colors cursor-pointer text-lg"
                  >
                    طلب إستمارة
                  </motion.button>
                  <Link
                      href="/goals"
                      className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                  >
                    أهداف التجمع
                  </Link>
                  <Link
                      href="/about"
                      className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                  >
                    من نحن
                  </Link>
                </motion.div>

                {/* Expandable Form Dropdown */}
                <div className="w-full flex flex-col items-center justify-center">
                  <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="w-full overflow-hidden"
                        >
                          <Form />
                        </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Scroll Anchor */}
                  <div ref={scrollAnchorRef} className="w-full h-1" />
                </div>
              </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 flex justify-center items-center gap-x-3 mt-auto border-t border-border/40 bg-background/50 backdrop-blur-xs">
          <SocialLinks />
        </footer>
      </div>
  );
}