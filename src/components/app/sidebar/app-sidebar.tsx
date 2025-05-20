'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar'
import AppSidebarFooter from './app-sidebar-footer'
import { NavGroup } from './nav-group'
import Logo from '@/components/logo'

import { SIDEBAR_DATA } from '@/data/constants'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar()

	return (
		<Sidebar collapsible='icon' variant='sidebar' {...props}>
			<SidebarHeader className='flex h-16 items-center gap-3 p-4 sm:gap-4 border-b-2'>
				<div className='grid place-content-center h-full'>
					<Logo isCollapsed={state === 'collapsed'} />
				</div>
			</SidebarHeader>
			<SidebarContent>
				{SIDEBAR_DATA.navGroups.map(props => (
					<NavGroup key={props.title} {...props} />
				))}
			</SidebarContent>
			<SidebarFooter>{state !== 'collapsed' && <AppSidebarFooter />}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
