'use client';

import { ReactNode } from 'react';
import { Card } from '@workspace/ui/components/card';

interface AuthWrapperProps {
  children: ReactNode;
}

/**
 * AuthWrapper component provides consistent styling for all auth components.
 * It wraps the content in a Card with consistent width and styling.
 */
export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Card className="w-full max-w-md">
      {children}
    </Card>
  );
} 