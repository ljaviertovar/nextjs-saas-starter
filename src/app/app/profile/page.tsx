import { getSession } from '@/utils'

export default async function ProfilePage() {
	const session = await getSession()

	return (
		<>
			<h1 className='text-center text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
				My Profile
			</h1>
			<div className='w-full text-center'>
				<span className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'>
					Manage your profile settings and preferences.
				</span>
			</div>

			<div className='flex items-center justify-center'>
				<div className=' grid grid-cols-2 mt-9'>
					<p>Name:</p>
					<p>{session?.user?.name ?? session?.user?.username}</p>
					<p>Email:</p>
					<p>{session?.user.email}</p>
				</div>
			</div>
		</>
	)
}
