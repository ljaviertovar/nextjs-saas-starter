export type NavItem = {
	onlySideNavItem?: boolean
	title: string
	path: string
	icon: JSX.Element | null
	submenu?: boolean
	subMenuItems?: NavItem[]
}
