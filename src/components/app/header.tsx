import { cn } from '@/lib/utils'
import AuthButtons from '../auth/auth-buttons'

import { useScrollPosition } from '@/hooks/use-scroll-position'

export default function Header() {
	const scrollPosition = useScrollPosition()

	return (
		<header className='w-full'>
			<div className='hidden container mx-auto max-w-7xl lg:flex h-14 justify-between items-center border-b-2'>
				<div className='flex-1'>
					<AuthButtons />
				</div>
			</div>
		</header>
	)
}
