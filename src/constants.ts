import { Clipboard } from 'lucide-react'
import { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: null,
		submenu: false,
		subMenuItems: [],
	},
	{
		title: 'All Tools',
		href: '/all-tools',
		icon: null,
		submenu: false,
		subMenuItems: [],
	},
]

export const APP_NAV_ITEMS: NavItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: Clipboard,
		submenu: false,
		subMenuItems: [],
	},
	{
		title: 'All Tools',
		href: '/all-tools',
		icon: null,
		submenu: false,
		subMenuItems: [],
	},
]
