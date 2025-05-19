import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface ContentSectionProps {
	title: string
	desc: string
	children: React.JSX.Element
}

export default function PageContent({ title, desc, children }: ContentSectionProps) {
	return (
		<ScrollArea className='h-screen '>
			<main className='flex flex-1 flex-col p-4 lg:p-6'>
				<div className='flex-none'>
					<h3 className='text-lg font-medium'>{title}</h3>
					<p className='text-muted-foreground text-sm'>{desc}</p>
				</div>
				<Separator className='my-4 flex-none' />
				<div className='h-full w-full overflow-x-hidden overflow-y-auto pb-12'>
					<div className='-mx-1 px-2 lg:max-w-xl'>{children}</div>
				</div>
			</main>
		</ScrollArea>
	)
}
