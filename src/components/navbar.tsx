import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'

export default function Navbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link
						href='/dashboard'
						legacyBehavior
						passHref
					>
						<NavigationMenuLink className='font-medium text-muted-foreground transition-colors mx-2 hover:text-primary'>
							Dashboard
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						href='/all-tools'
						legacyBehavior
						passHref
					>
						<NavigationMenuLink className='font-medium text-muted-foreground transition-colors hover:text-primary'>
							All tools
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
