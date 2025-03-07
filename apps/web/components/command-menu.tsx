'use client';

import { ArrowBigRightDashIcon, Laptop2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { sidebarData } from '@/layouts/data/sidebar-data';
import { useSearchStore } from '@/store/search';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@workspace/ui/components/command';
import { ScrollArea } from '@workspace/ui/components/scroll-area';

export function CommandMenu() {
    const router = useRouter();

    const { setTheme } = useTheme();
    const { open, setOpen } = useSearchStore();

    const runCommand = useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    const toggle = useSearchStore((state) => state.toggle);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggle]);

    return (
        <CommandDialog modal open={open} onOpenChange={setOpen}>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
                <ScrollArea type='hover' className='h-72 pr-1'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sidebarData.navGroups.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items.map((navItem, i) => {
                                if (navItem.url)
                                    return (
                                        <CommandItem
                                            key={`${navItem.url}-${i}`}
                                            value={navItem.title}
                                            onSelect={() => {
                                                runCommand(() => router.push(navItem.url!));
                                            }}
                                        >
                                            <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                                                <ArrowBigRightDashIcon className='size-2 text-muted-foreground/80' />
                                            </div>
                                            {navItem.title}
                                        </CommandItem>
                                    );

                                return navItem.items?.map((subItem, i) => (
                                    <CommandItem
                                        key={`${subItem.url}-${i}`}
                                        value={subItem.title}
                                        onSelect={() => {
                                            runCommand(() => router.push(subItem.url));
                                        }}
                                    >
                                        <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                                            <ArrowBigRightDashIcon className='size-2 text-muted-foreground/80' />
                                        </div>
                                        {subItem.title}
                                    </CommandItem>
                                ));
                            })}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading='Theme'>
                        <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
                            <Sun /> <span>Light</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
                            <Moon className='scale-90' />
                            <span>Dark</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
                            <Laptop2 />
                            <span>System</span>
                        </CommandItem>
                    </CommandGroup>
                </ScrollArea>
            </CommandList>
        </CommandDialog>
    );
}
