import AuthButtons from '../auth/auth-buttons'

export default function Header() {
	return (
		<header className='w-full'>
			<div className='hidden mx-auto p-4 lg:flex h-14 justify-between items-center border-b-2'>
				<div className='flex-1'>
					<AuthButtons />
				</div>
			</div>
		</header>
	)
}
