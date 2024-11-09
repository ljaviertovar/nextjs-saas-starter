import { LayoutDashboard, Sparkle, Wrench } from 'lucide-react'
import { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
	{
		title: 'Featured Tools',
		href: '#featured-tools',
		icon: Sparkle,
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
