import { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
	{
		onlySideNavItem: true,
		title: 'Home',
		path: '/',
		icon: null,
	},
	{
		title: 'Dashboard',
		path: '/dashboard',
		icon: null,
		submenu: false,
		subMenuItems: [],
	},
	{
		title: 'All Tools',
		path: '/all-tools',
		icon: null,
		submenu: false,
		subMenuItems: [],
	},
]
