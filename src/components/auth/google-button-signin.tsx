import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'
import { GoogleIcon, SpinnerIcon } from '../icons/'

export default function GoogleButtonSignin() {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<Button
			variant='outline'
			type='button'
			disabled={isLoading}
			className='flex items-center justify-center gap-2 '
		>
			{isLoading ? (
				<span className='animate-spin'>
					<SpinnerIcon size={16} />
				</span>
			) : (
				<GoogleIcon size={16} />
			)}{' '}
			Sign in with Google
		</Button>
	)
}
