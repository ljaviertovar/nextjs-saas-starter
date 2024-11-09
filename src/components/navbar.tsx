import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'

import { NAV_ITEMS } from '@/constants'

export default function Navbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{NAV_ITEMS.map(item => (
					<NavigationMenuItem>
						<Link href={item.href} legacyBehavior passHref>
							<NavigationMenuLink className='font-medium text-muted-foreground transition-colors hover:text-primary'>
								{item.title}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
