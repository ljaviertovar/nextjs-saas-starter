'use client'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import AuthButtons from '@/components/auth/auth-buttons'

import { useScrollPosition } from '@/hooks/use-scroll-position'

import { cn } from '@/lib/utils'

export const Header = () => {
	const scrollPosition = useScrollPosition()

	return (
		<header
			className={cn(
				'sticky top-0 z-50 flex h-16 items-center gap-3 p-4 sm:gap-4 border-b-2',
				scrollPosition > 20
					? 'bg-background/40  bg-opacity-60 backdrop-blur-lg backdrop-filter border-b'
					: 'bg-trasparent '
			)}
		>
			<SidebarTrigger variant='secondary' className='scale-125 sm:scale-100' />
			<Separator orientation='vertical' className='h-6' />
			<div className='flex-1'>
				<AuthButtons />
			</div>
		</header>
	)
}

Header.displayName = 'Header'
