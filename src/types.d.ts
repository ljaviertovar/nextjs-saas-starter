import { LucideIcon } from 'lucide-react'

export type NavItemO = {
	title: string
	href: string
	icon?: LucideIcon
	submenu?: boolean
	subMenuItems?: NavItem[]
}

interface BaseNavItem {
	title: string
	badge?: string
	icon?: LucideIcon
}

type NavLink = BaseNavItem & {
	url: LinkProps['to']
	items?: never
}

type NavCollapsible = BaseNavItem & {
	items: (BaseNavItem & { url: LinkProps['to'] })[]
	url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
	title: string
	items: NavItem[]
}

interface SidebarData {
	navGroups: NavGroup[]
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink }
