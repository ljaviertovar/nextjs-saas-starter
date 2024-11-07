export default async function DashboardPage() {
	return (
		<section className=''>
			<h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]'>
				Dashboard
			</h1>
			<span
				className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'
				style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit' }}
			>
				Welcome to your dashboard. Here you can manage your tools.
			</span>
		</section>
	)
}
