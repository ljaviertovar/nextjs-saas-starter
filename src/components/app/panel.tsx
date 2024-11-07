'use client'

import { useState } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import Header from '../header'

import { cn } from '@/lib/utils'
import SideNav from '../side-nav'

interface Props {
	defaultLayout: number[] | undefined
	defaultCollapsed?: boolean
	navCollapsedSize: number
}

export function Panel({ defaultLayout = [20, 80], defaultCollapsed = false, navCollapsedSize }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
	const [selectedOption, setSelectedOption] = useState('Icon')

	return (
		<div className='hidden md:block'>
			<TooltipProvider delayDuration={0}>
				<ResizablePanelGroup
					direction='horizontal'
					onLayout={(sizes: number[]) => {
						document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
					}}
					className='h-screen fixed items-stretch'
				>
					<ResizablePanel
						defaultSize={defaultLayout[0]}
						collapsedSize={navCollapsedSize}
						collapsible={true}
						minSize={8}
						maxSize={12}
						onCollapse={() => {
							setIsCollapsed(true)
							document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
						}}
						onExpand={() => {
							setIsCollapsed(false)
							document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
						}}
						className={cn(isCollapsed && 'min-w-[72px] transition-all duration-300 ease-in-out')}
					>
						<SideNav isCollapsed={isCollapsed} />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel>
						<Header />
						<div className='flex h-full items-center justify-center p-6'>
							<span className='font-semibold'>Content</span>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</TooltipProvider>
		</div>
	)
}
