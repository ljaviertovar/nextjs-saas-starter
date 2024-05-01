'use client'

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { User } from '@prisma/client'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '../ui/button'
import { UserNav } from './user-nav'

export default function AuthButtons() {
	const { data: session } = useSession()

	if (!session) {
		return (
			<div className='flex justify-end gap-4'>
				<Skeleton className='h-9 w-9 rounded-full' />
			</div>
		)
	}

	return (
		<div className='flex justify-end gap-4'>
			{session && session.user ? (
				<UserNav user={session.user as User} />
			) : (
				<>
					<Button
						size={'sm'}
						variant={'secondary'}
						onClick={() => signIn()}
					>
						Sign In
					</Button>
					<Button
						size={'sm'}
						asChild
						className='text-foreground'
					>
						<Link href='/auth/signup'>Sign Up</Link>
					</Button>
				</>
			)}
		</div>
	)
}
