import { cookies } from 'next/headers'

import { AppSidebar } from '@/components/app/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

import { Header } from '@/components/app/header'

import { cn } from '@/lib/utils'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const sidebarState = cookies().get('sidebar_state')
	const defaultOpen = sidebarState?.value !== 'false'

	return (
		<>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar />
				<div
					id='content'
					className={cn(
						'ml-auto w-full max-w-full',
						'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
						'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
						'sm:transition-[width] sm:duration-200 sm:ease-linear',
						'flex h-svh flex-col',
						'group-data-[scroll-locked=1]/body:h-full',
						'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
					)}
				>
					<Header />
					{children}
				</div>
			</SidebarProvider>
		</>
	)
}
