import PageHeader from '@/components/app/page-header'
import Dashboard from '@/feautures/dashboard'
import PageContent from '@/feautures/components/page-content'

export default async function DashboardPage() {
	return (
		<>
			<PageHeader title='Dashboard' desc='Here you can manage your tools.' />
			<PageContent>
				<Dashboard />
			</PageContent>
		</>
	)
}
