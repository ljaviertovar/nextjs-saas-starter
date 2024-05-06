export default async function AllToolsPage() {
	return (
		<section className='mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20'>
			<h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]'>
				All Tool Categories
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
