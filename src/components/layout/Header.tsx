// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/chatbot', label: 'Chatbot' },
  { href: '/stress-test', label: 'Test de Estrés' },
  { href: '/articles', label: 'Artículos' },
  { href: '/resources', label: 'Recursos' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  const NavLink = ({ href, label }: { href: string; label: string; }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-current={pathname === href ? "page" : undefined}
      >
        {label}
      </Button>
    </Link>
  );
  
  const MobileNavLink = ({ href, label }: { href: string; label: string; }) => (
     <SheetClose asChild>
        <Link href={href} passHref>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-base font-medium transition-colors hover:text-primary py-3",
              pathname === href ? "text-primary font-semibold bg-accent" : "text-muted-foreground"
            )}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Button>
        </Link>
      </SheetClose>
  );

  if (!mounted) {
    return ( 
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-headline">Xstrees</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> 
          </div>
        </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 text-lg font-bold" aria-label="Xstrees Inicio">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-headline">Xstrees</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                   <Link href="/" className="flex items-center space-x-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="font-headline">Xstrees</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Cerrar menú">
                        <X className="h-6 w-6" />
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <MobileNavLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
