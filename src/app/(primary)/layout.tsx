import Header from '@/components/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />

			<main className='container w-full max-w-7xl'>{children}</main>
		</>
	)
}
