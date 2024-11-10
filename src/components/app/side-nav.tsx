import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

import Logo from '../Logo'

import { cn } from '@/lib/utils'
import { NavItem } from '@/types'
import { APP_NAV_ITEMS } from '../../constants'

interface Props {
	isCollapsed: boolean
}

export default function SideNav({ isCollapsed }: Props) {
	const pathname = usePathname()

	return (
		<div data-collapsed={isCollapsed} className='h-[calc(100%-10px)] flex flex-col'>
			<div className='h-14 border-b-2 grid place-content-center'>
				<Logo isCollapsed={isCollapsed} />
			</div>

			<div className='flex-1 flex flex-col justify-between'>
				<nav className='grid py-4  px-2 gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2  '>
					{APP_NAV_ITEMS.map((link, index) =>
						isCollapsed ? (
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger>
									<MenuLink key={index} pathname={pathname} isCollapsed={isCollapsed} {...link} />
								</TooltipTrigger>
								<TooltipContent side='right' className='flex items-center'>
									{link.title}
								</TooltipContent>
							</Tooltip>
						) : (
							<MenuLink key={index} pathname={pathname} isCollapsed={isCollapsed} {...link} />
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
							Hackernoon
						</a>
					</p>
				)}
			</div>
		</div>
	)
}

const MenuLink = ({
	href,
	title,
	icon: Icon,
	pathname,
	isCollapsed,
}: NavItem & { pathname: string; isCollapsed: boolean }) => {
	return (
		<Link
			href={href}
			className={cn(
				'rounded-sm p-2 flex gap-2 items-center justify-start hover:bg-primary/20',
				`${isCollapsed && 'justify-center '}`,
				`${pathname === href && 'bg-primary/20'}`
			)}
		>
			{Icon && <Icon className='h-4 w-4' />}
			{!isCollapsed && <span className='text-sm'>{title}</span>}
		</Link>
	)
}
