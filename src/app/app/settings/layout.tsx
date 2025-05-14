import PageHeader from '@/components/app/page-header'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<PageHeader title='Settings' desc='Manage your account settings and set e-mail preferences.' />
			{children}
		</>
	)
}
