import { cookies } from 'next/headers'

import Header from '@/components/app/header'
import { Panel } from '@/components/app/panel'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const layout = cookies().get('react-resizable-panels:layout')
	const collapsed = cookies().get('react-resizable-panels:collapsed')

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

	return (
		<div className='flex flex-col'>
			<Panel defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />

			{/* <div className=''>
				<Header />
				{children}
			</div> */}
		</div>
	)
}
