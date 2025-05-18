'use client'
// export default function Header() {
// 	return (
// 		<header className='w-full'>
// 			<div className='hidden mx-auto p-4 lg:flex h-14 justify-between items-center border-b-2'>
// 				<div className='flex-1'>
// 					<AuthButtons />
// 				</div>
// 			</div>
// 		</header>
// 	)
// }

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import AuthButtons from '@/components/auth/auth-buttons'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
	fixed?: boolean
}

export const Header = ({ fixed }: Props) => {
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			setOffset(document.body.scrollTop || document.documentElement.scrollTop)
		}

		// Add scroll listener to the body
		document.addEventListener('scroll', onScroll, { passive: true })

		// Clean up the event listener on unmount
		return () => document.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<header
			className={cn(
				' flex h-16 items-center gap-3 p-4 sm:gap-4 border-b-2',
				fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
				offset > 10 && fixed ? 'shadow-sm' : 'shadow-none'
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
