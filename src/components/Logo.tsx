import Link from 'next/link'

interface Props {
	isCollapsed?: boolean
}

export default function Logo({ isCollapsed }: Props) {
	console.log(isCollapsed)
	return (
		<Link href='/' className='font-semibold flex flex-none gap-2'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='h-6 w-6'
			>
				<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
			</svg>
			{!isCollapsed && <span>My SaaS</span>}
		</Link>
	)
}
