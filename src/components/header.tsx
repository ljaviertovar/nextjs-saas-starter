'use client'

import Link from 'next/link'

import AuthButtons from './auth/auth-buttons'

import { useScrollPosition } from '@/hooks/use-scroll-position'

export default function Header() {
	const scrollPosition = useScrollPosition()

	return (
		<header
			className={`sticky top-0 z-50 transition-shadow w-full
  ${
		scrollPosition > 56
			? 'bg-background/40 shadow bg-opacity-60 backdrop-blur-lg backdrop-filter border-b'
			: 'bg-trasparent shadow-none'
	}
  `}
		>
			<div className='container mx-auto max-w-7xl flex h-14 justify-between items-center'>
				<div className='flex items-center font-semibold text-lg '>
					<Link
						href='/'
						className='inline-flex'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='mr-2 h-6 w-6'
						>
							<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
						</svg>
						My SaaS
					</Link>
				</div>

				<AuthButtons />
			</div>
		</header>
	)
}
