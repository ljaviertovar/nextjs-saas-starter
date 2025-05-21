import Header from '@/components/marketing/header'
import HeaderMobile from '@/components/marketing/header-mobile'

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<HeaderMobile />

			<main className='container w-full max-w-7xl pt-14 md:pt-0'>{children}</main>
		</>
	)
}
