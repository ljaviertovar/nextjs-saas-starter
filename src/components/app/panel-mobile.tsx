import HeaderMobile from './header-mobile'

interface Props {
	children: React.ReactNode
}

export default function PanelMobile({ children }: Props) {
	return (
		<div className='md:hidden pt-14'>
			<HeaderMobile />
			<main className='w-full p-2'>{children}</main>
		</div>
	)
}
