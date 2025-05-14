import SettingsProfile from '@/feautures/settings/profile'
import { getSession } from '@/utils/auth-utils'

export default async function ProfilePage() {
	const session = await getSession()

	return (
		<>
			<div className='flex items-center justify-center'>
				<SettingsProfile />

				{/* <div className=' grid grid-cols-2 mt-9'>
					<p>Name:</p>
					<p>{session?.user?.name ?? session?.user?.username}</p>
					<p>Email:</p>
					<p>{session?.user.email}</p>
				</div> */}
			</div>
		</>
	)
}
