import { useState } from 'react'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface Props {
	setSelectedOption: (value: string) => void
	options: {
		id: number
		title: string
		icon: LucideIcon
	}[]
}

export default function MobileNav({ setSelectedOption, options }: Props) {
	const [optionActive, setOptionActive] = useState<number>(options[0].id)

	return (
		<nav className='p-4 flex gap-4'>
			{options.map(option => (
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
			))}
		</nav>
	)
}
