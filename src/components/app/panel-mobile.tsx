import HeaderMobile from './header-mobile'

interface Props {
	children: React.ReactNode
}

export default function PanelMobile({ children }: Props) {
	return (
		<div className='md:hidden'>
			<HeaderMobile />
			<main className='w-full px-2 mt-14'>{children}</main>
		</div>
	)
}
