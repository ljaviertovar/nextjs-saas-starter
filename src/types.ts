import { LucideIcon } from 'lucide-react'

export type NavItem = {
	title: string
	href: string
	icon?: LucideIcon
	submenu?: boolean
	subMenuItems?: NavItem[]
}
