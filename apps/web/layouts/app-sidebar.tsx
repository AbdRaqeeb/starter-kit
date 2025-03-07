'use client';

import { NavGroup } from '@/layouts/nav-group';
import { NavUser } from '@/layouts/nav-user';
import { TeamSwitcher } from '@/layouts/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@workspace/ui/components/sidebar';
import { sidebarData } from './data/sidebar-data';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' variant='floating' className='bg-sidebar' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
