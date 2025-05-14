import type { Metadata } from 'next'

import PageHeader from '@/components/app/page-header'

export const metadata: Metadata = {
	title: 'My SaaS - Settings',
	description: 'The best SaaS in the world!',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<PageHeader title='Settings' desc='Manage your account settings and set e-mail preferences.' />
			{children}
		</>
	)
}
