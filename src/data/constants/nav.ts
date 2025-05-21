import { NavItem, SidebarData } from '@/types'
import { LayoutDashboard, Settings, Sparkle, Wrench, UserCog, Boxes } from 'lucide-react'

export const NAV_ITEMS: any[] = [
	{
		title: 'Featured Tools',
		href: '#featured-tools',
		icon: Sparkle,
		submenu: false,
		subMenuItems: [],
	},
]

export const SIDEBAR_DATA: SidebarData = {
	navGroups: [
		{
			title: 'General',
			items: [
				{
					title: 'Dashboard',
					url: '/dashboard',
					icon: LayoutDashboard,
				},
				{
					title: 'Tools',
					url: '/tools',
					icon: Boxes,
				},
			],
		},
		{
			title: 'Other',
			items: [
				{
					title: 'Settings',
					icon: Settings,
					items: [
						{
							title: 'Profile',
							url: '/settings/profile',
							icon: UserCog,
						},
						{
							title: 'Account',
							url: '/settings/account',
							icon: Wrench,
						},
					],
				},
			],
		},
	],
}

export const USER_NAV_ITEMS: NavItem[] = [
	{
		title: 'Profile',
		url: '/settings/profile',
	},
	{
		title: 'Dashboard',
		url: '/dashboard',
	},
]
