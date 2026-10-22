import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function PageContainer({ title, children }: { title: string; children: React.ReactNode }) {
  const { url } = usePage();
  const isHomePage = url === '/';

  return (
      <div className="py-10 px-5 bg-background rounded-t-xl shadow-2xl text-foreground min-h-screen">
        <Head>
          <title>{title}</title>
        </Head>

        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-5xl font-black text-center mb-3 tracking-tight">
            {title}
          </h1>

          {!isHomePage && (
              <Link
                  href="/"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted/80 border border-border/60 hover:border-border rounded-full shadow-xs hover:shadow-md backdrop-blur-xs transition-all duration-300 ease-out active:scale-95"
              >
                <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
                <span>العودة إلى الصفحة الرئيسية</span>
              </Link>
          )}
        </div>

        <div className="container mx-auto">
          {children}
        </div>
      </div>
  );
}