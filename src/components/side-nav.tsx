import React, { ReactNode, useState } from 'react'
import { Clipboard, LucideIcon } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { APP_NAV_ITEMS } from '../constants'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/types'

interface Props {
	isCollapsed: boolean
}

export default function SideNav({ isCollapsed }: Props) {
	const pathname = usePathname()

	return (
		<div data-collapsed={isCollapsed} className='h-[calc(100%-80px)] flex flex-col justify-between gap-4'>
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{APP_NAV_ITEMS.map((link, index) =>
					isCollapsed ? (
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									href='#'
									className={cn(
										'h-9 w-9',

										'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
									)}
								>
									{/* <link.icon className="h-4 w-4" /> */}
									<span className='sr-only'>{link.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right' className='flex items-center gap-4'>
								{link.title}
							</TooltipContent>
						</Tooltip>
					) : (
						<MenuLink key={index} pathname={pathname} {...link} />
					)
				)}
			</nav>

			{!isCollapsed && (
				<p className='p-4 text-sm text-muted-foreground'>
					Application explained on{' '}
					<a
						href='https://hackernoon.com/u/ljaviertovar'
						target='_blank'
						rel='noreferrer'
						className='text-primary font-medium underline'
					>
						Medium
					</a>
				</p>
			)}
		</div>
	)
}

const MenuLink = ({ href, title, icon: Icon, pathname }: NavItem & { pathname: string }) => {
	return (
		<Link href={href} className={`rounded-sm p-2 justify-start hover:bg-muted ${pathname === href && 'bg-primary/30'}`}>
			{Icon && <Icon className='mr-2 h-4 w-4' />}
			{title}
		</Link>
	)
}
