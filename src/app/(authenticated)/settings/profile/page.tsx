import PageHeader from '@/components/app/page-header'
import PageContent from '@/feautures/components/page-content'
import Profile from '@/feautures/settings/profile'

export default async function ProfilePage() {
	return (
		<>
			<PageHeader title='Settings' desc='Manage your account settings and set e-mail preferences.' />
			<PageContent title='Profile' desc='This is how others will see you on the site.'>
				<Profile />
			</PageContent>
		</>
	)
}
