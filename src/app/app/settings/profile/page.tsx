import PageContent from '@/feautures/settings/components/page-content'
import Profile from '@/feautures/settings/profile'

export default async function ProfilePage() {
	return (
		<PageContent title='Profile' desc='This is how others will see you on the site.'>
			<Profile />
		</PageContent>
	)
}
