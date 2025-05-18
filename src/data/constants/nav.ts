import { SidebarData } from '@/types'
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
					url: '/app/dashboard',
					icon: LayoutDashboard,
				},
				{
					title: 'Tools',
					url: '/app/tools',
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
							url: '/app/settings/profile',
							icon: UserCog,
						},
						{
							title: 'Account',
							url: '/app/settings/account',
							icon: Wrench,
						},
					],
				},
			],
		},
	],
}

export const USER_NAV_ITEMS: any[] = [
	{
		title: 'Profile',
		href: '/app/settings/profile',
	},
	{
		title: 'Dashboard',
		href: '/app/dashboard',
	},
]
