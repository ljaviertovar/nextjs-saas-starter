import { Separator } from '@/components/ui/separator'

interface Props {
	title: string
	desc: string
}

export default function PageHeader({ title, desc }: Props) {
	return (
		<header className='sticky top-0 bg-red-100 z-50 shadow bg-opacity-60 backdrop-blur-lg backdrop-filter'>
			<div className='space-y-0.5'>
				<h1 className='text-2xl font-bold tracking-tight md:text-3xl'>{title}</h1>
				<p className='text-muted-foreground'>{desc}</p>
			</div>
			<Separator className='my-4 lg:my-6' />
		</header>
	)
}
