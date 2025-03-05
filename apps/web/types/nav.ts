import { LucideIcon } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    icon?: LucideIcon;
    children?: Omit<NavItem, 'children'>[];
}

export interface NavConfig {
    items: NavItem[];
}

export interface HeaderConfig {
    items: NavItem[];
}
