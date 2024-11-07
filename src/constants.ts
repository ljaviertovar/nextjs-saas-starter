import { LayoutDashboard, Wrench } from 'lucide-react'
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
		href: '/app/dashboard',
		icon: LayoutDashboard,
		submenu: false,
		subMenuItems: [],
	},
	{
		title: 'All Tools',
		href: '/app/all-tools',
		icon: Wrench,
		submenu: false,
		subMenuItems: [],
	},
]
