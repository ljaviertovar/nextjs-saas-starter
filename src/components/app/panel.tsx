'use client'

import { useState } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'
import SideNav from './side-nav'
import Header from './header'
import { ScrollArea } from '../ui/scroll-area'

interface Props {
	defaultLayout: number[] | undefined
	defaultCollapsed?: boolean
	navCollapsedSize: number
	children: React.ReactNode
}

export function Panel({ defaultLayout = [20, 80], defaultCollapsed = false, navCollapsedSize, children }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

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
						<ScrollArea className='h-[calc(100vh-56px)]'>
							<section className='p-4 w-full'>{children}</section>
						</ScrollArea>
					</ResizablePanel>
				</ResizablePanelGroup>
			</TooltipProvider>
		</div>
	)
}
