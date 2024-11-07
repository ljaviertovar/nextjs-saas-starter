import { useState } from 'react'
import { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

interface Props {
	isCollapsed: boolean
	setSelectedOption: (value: string) => void
	options: {
		id: number
		title: string
		icon: LucideIcon
	}[]
}

export default function SideNav({ isCollapsed, setSelectedOption, options }: Props) {
	const [optionActive, setOptionActive] = useState<number>(options[0].id)

	return (
		<div data-collapsed={isCollapsed} className='h-[calc(100%-80px)] flex flex-col justify-between gap-4'>
			<nav className='grid gap-2 p-4 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:p-4'>
				{options.map(option =>
					isCollapsed ? (
						<Tooltip key={option.id} delayDuration={0}>
							<TooltipTrigger asChild>
								<Button
									onClick={() => {
										setOptionActive(option.id)
										setSelectedOption(option.title)
									}}
									variant={'secondary'}
									size={'sm'}
									className={cn(
										'hover:bg-amber-500/90',
										optionActive === option.id && 'bg-amber-500 text-foreground',
										'justify-start'
									)}
								>
									<option.icon className='h-4 w-4' />
									<span className='sr-only'>{option.title}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent side='right' className='flex items-center gap-4'>
								{option.title}
							</TooltipContent>
						</Tooltip>
					) : (
						<Button
							key={option.id}
							onClick={() => {
								setOptionActive(option.id)
								setSelectedOption(option.title)
							}}
							variant={'secondary'}
							size={'sm'}
							className={cn(
								'hover:bg-amber-500/90',
								optionActive === option.id && 'bg-amber-500 text-foreground',
								'justify-start'
							)}
						>
							<option.icon className='mr-2 h-4 w-4' />
							{option.title}
						</Button>
					)
				)}
			</nav>

			{!isCollapsed && (
				<p className='p-4 text-sm text-muted-foreground'>
					Application explained on{' '}
					<a
						href='https://hackernoon.com/u/ljaviertovar'
						target='_blank'
						rel='noreferrer'
						className='text-primary font-medium underline'
					>
						Medium
					</a>
				</p>
			)}
		</div>
	)
}
