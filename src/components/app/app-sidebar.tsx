'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar'
import Logo from '../logo'
import AppSidebarFooter from './app-sidebar-footer'
import { SIDEBAR_DATA } from '@/data/constants'
import { NavGroup } from './nav-group'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar()

	return (
		<Sidebar collapsible='icon' variant='sidebar' {...props} className='bg-transparent'>
			<SidebarHeader>
				<div className='h-14 border-b-2 grid place-content-center'>
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
