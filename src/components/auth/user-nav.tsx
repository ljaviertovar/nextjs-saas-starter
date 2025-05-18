import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { UserNavItem } from '@/types'
import { USER_NAV_ITEMS } from '@/data/constants/nav'

interface Props {
	user: User
}

const UserNavItem = ({ title, href }: UserNavItem) => {
	return (
		<DropdownMenuItem>
			<Link className='block w-full h-6 text-sm text-left' href={href}>
				{title}
			</Link>
		</DropdownMenuItem>
	)
}

export function UserNav({ user }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={user.image ? user.image : '/img/avatars/01.png'} alt={user.username ?? user.name ?? ''} />
						<AvatarFallback>UU</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-2'>
						<p className='text-sm font-medium leading-none'>{user.username ?? user.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{USER_NAV_ITEMS.map(item => (
					<UserNavItem title={item.title} href={item.href} />
				))}

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Button
						variant={'ghost'}
						size={'sm'}
						className='w-full h-6'
						onClick={() => signOut({ callbackUrl: '/auth/signin' })}
					>
						Sign Out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
