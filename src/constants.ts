import { LayoutDashboard, Wrench } from 'lucide-react'
import { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
	{
		title: 'Featured Apps',
		href: '#featured-apps',
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
		title: 'All Apps',
		href: '/app/all-apps',
		icon: Wrench,
		submenu: false,
		subMenuItems: [],
	},
]
