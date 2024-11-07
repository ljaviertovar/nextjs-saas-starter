export default async function DashboardPage() {
	return (
		<>
			<h1 className='text-center text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
				Dashboard
			</h1>
			<div className='w-full mx-auto text-center'>
				<span className='max-w-[750px] text-lg text-muted-foreground sm:text-xl'>
					Welcome to your dashboard. Here you can manage your tools.
				</span>
			</div>
		</>
	)
}
