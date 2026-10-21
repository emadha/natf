import React, {useEffect, useState} from 'react';
import {Link} from '@inertiajs/react';
import {FileText, Info, Menu, Target} from 'lucide-react';
import SocialLinks from '@/pages/components/social-links';

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: AppLayoutProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener to toggle header styles after 50px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
        {/* Background Image Layer */}
        <div className="stripes fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div
              className="size-full scale-110 grayscale opacity-40"
              style={{
                backgroundImage: `url('/bg.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
          />
        </div>
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
                <Menu className="size-6 text-foreground"/>
              </div>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col justify-between text-right p-6">
              <div>
                <SheetHeader className="text-right border-b pb-4 mb-6">
                  <SheetTitle className="text-xl font-bold text-foreground">القائمة الرئيسية</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-2">
                  <Button
                      asChild
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                  >
                    <Link href="/apply" onClick={() => setIsSheetOpen(false)}>
                      <FileText className="size-5 text-primary"/>
                      <span>طلب إستمارة</span>
                    </Link>
                  </Button>

                  <Button
                      asChild
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                  >
                    <Link href="/goals" onClick={() => setIsSheetOpen(false)}>
                      <Target className="size-5 text-primary"/>
                      <span>أهداف التجمع</span>
                    </Link>
                  </Button>

                  <Button
                      asChild
                      variant="ghost"
                      className="justify-start gap-3 text-base font-medium h-12 w-full text-right"
                  >
                    <Link href="/about" onClick={() => setIsSheetOpen(false)}>
                      <Info className="size-5 text-primary"/>
                      <span>من نحن</span>
                    </Link>
                  </Button>
                </nav>
              </div>

              <div className="pt-6 border-t border-border/60 flex justify-center">
                <SocialLinks/>
              </div>
            </SheetContent>
          </Sheet>

          <Link href={'/'}>
            <img src="/logo.jpeg" alt="Logo" className="h-12 w-auto my-1 ml-4 rounded-md"/>
          </Link>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 pt-20 px-4 flex flex-col items-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 flex justify-center items-center gap-x-3 mt-auto bg-background">
          <SocialLinks/>
        </footer>
      </div>
  );
}