import PageHeader from '@/components/app/page-header'
import PageContent from '@/feautures/components/page-content'
import Account from '@/feautures/settings/account'

export default async function AccountPage() {
	return (
		<>
			<PageHeader title='Settings' desc='Manage your account settings and set e-mail preferences.' />
			<PageContent title='Account' desc='Update your account settings. Set your preferred language and timezone.'>
				<Account />
			</PageContent>
		</>
	)
}
