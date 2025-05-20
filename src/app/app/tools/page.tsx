import PageHeader from '@/components/app/page-header'
import PageContent from '@/feautures/components/page-content'
import Tools from '@/feautures/tools'

export default async function ToolsPage() {
	return (
		<>
			<PageHeader title='Tools' desc='Find Most Popular and Featured Tools by Category.' />
			<PageContent>
				<Tools />
			</PageContent>
		</>
	)
}
