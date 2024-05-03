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

interface Props {
	user: User
}

export function UserNav({ user }: Props) {
	console.log({ user })
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative h-8 w-8 rounded-full'
				>
					<Avatar className='h-9 w-9'>
						<AvatarImage
							src={user.image ? user.image : '/img/avatars/01.png'}
							alt={user.username ?? user.name ?? ''}
						/>
						<AvatarFallback>UU</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-2'>
						<p className='text-sm font-medium leading-none'>{user.username ?? user.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link
						className='block w-full h-6 text-sm text-left'
						href='/auth/profile'
					>
						Profile
					</Link>
				</DropdownMenuItem>
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
