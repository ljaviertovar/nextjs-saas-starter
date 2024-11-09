export default async function AllToolsPage() {
	return (
		<section className='mx-auto flex w-full flex-col items-center gap-2 pt-4'>
			<h1 className='text-center text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
				All Tools
			</h1>
			<span
				className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'
				style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit' }}
			>
				Find Most Popular and Featured Tools by Category
			</span>
		</section>
	)
}
