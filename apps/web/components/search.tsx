'use client';

import { Search as IconSearch } from 'lucide-react';

import { useSearchStore } from '@/store/search';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

interface Props {
    className?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
}

export function Search({ className = '', placeholder = 'Search' }: Props) {
    const { setOpen } = useSearchStore();
    return (
        <Button
            variant='outline'
            className={cn(
                'relative h-8 w-full flex-1 md:flex-none justify-start rounded-md bg-muted/25 hover:bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64',
                className
            )}
            onClick={() => setOpen(true)}
        >
            <IconSearch aria-hidden='true' className='absolute left-1.5 top-1/2 -translate-y-1/2' />
            <span className='ml-3'>{placeholder}</span>
            <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
                <span className='text-xs'>⌘</span>K
            </kbd>
        </Button>
    );
}
