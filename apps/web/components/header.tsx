'use client';

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  appName: string;
  logo?: React.ReactNode;
  navItems?: {
    label: string;
    href: string;
  }[];
  rightContent?: React.ReactNode;
}

export function Header({ 
  appName, 
  logo, 
  navItems = [], 
  rightContent 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          {logo}
          <Link href="/" className="font-semibold">
            {appName}
          </Link>
        </div>
        
        {navItems?.length > 0 && (
          <nav className="flex items-center gap-6 text-sm">
            {navItems?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex flex-1 items-center justify-end gap-2">
          {rightContent}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 