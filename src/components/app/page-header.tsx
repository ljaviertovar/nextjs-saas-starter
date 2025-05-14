import { Separator } from '@/components/ui/separator'

interface Props {
	title: string
	desc: string
}

export default function PageHeader({ title, desc }: Props) {
	return (
		<header>
			<div className='space-y-0.5 p-4 lg:p-6'>
				<h1 className='text-2xl font-bold tracking-tight md:text-3xl'>{title}</h1>
				<p className='text-muted-foreground'>{desc}</p>
			</div>
			<Separator />
		</header>
	)
}
