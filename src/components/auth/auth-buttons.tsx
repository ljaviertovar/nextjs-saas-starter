'use client'

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

import { Button } from '../ui/button'
import { UserNav } from './user-nav'

export default function AuthButtons() {
	const { data: session } = useSession()

	return (
		<div className='flex justify-end gap-4'>
			{session && session.user ? (
				<UserNav user={session.user} />
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
