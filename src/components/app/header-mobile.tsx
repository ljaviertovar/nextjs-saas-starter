'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion, useCycle } from 'framer-motion'

import Logo from '../Logo'
import AuthButtons from '../auth/auth-buttons'

import { useScrollPosition } from '@/hooks/use-scroll-position'

import { NavItem } from '@/types'
import { APP_NAV_ITEMS } from '@/constants'

type MenuItemWithSubMenuProps = {
	item: NavItem
	toggleOpen: () => void
}

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 0 0)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: 'circle(0px at 0 0)',
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
}

export default function HeaderMobile() {
	const pathname = usePathname()
	const containerRef = useRef(null)
	const { height } = useDimensions(containerRef)
	const [isOpen, toggleOpen] = useCycle(false, true)

	const scrollPosition = useScrollPosition()

	return (
		<header>
			<motion.nav
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
				custom={height}
				className={`fixed inset-0 z-50 w-full lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
				ref={containerRef}
			>
				<motion.div className='absolute inset-0 right-0 w-full bg-background' variants={sidebar} />
				<motion.ul
					variants={variants}
					className='absolute grid place-content-center h-full w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto'
				>
					{APP_NAV_ITEMS.map((item, idx) => {
						return (
							<div key={idx}>
								{item.submenu ? (
									<MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
								) : (
									<MenuItem>
										<Link
											href={item.href}
											onClick={() => toggleOpen()}
											className={`flex w-full text-2xl mb-2 text-muted-foreground ${
												item.href === pathname && 'text-primary'
											}`}
										>
											<div className='flex items-center gap-2'>
												{item.icon && <item.icon className='h-6 w-6' />}

												{item.title}
											</div>
										</Link>
									</MenuItem>
								)}
							</div>
						)
					})}
				</motion.ul>
				<div
					className={`sticky top-0 z-50 transition-shadow w-full h-14 border-b
${
	scrollPosition > 56
		? 'bg-background/40 shadow bg-opacity-60 backdrop-blur-lg backdrop-filter border-b'
		: 'bg-trasparent shadow-none'
}
`}
				>
					<div className='absolute left-2 top-[16px] z-30'>
						<MenuToggle toggle={toggleOpen} />
					</div>
					<div className='absolute w-full grid place-content-center mt-[14px]'>
						<Logo />
					</div>
					<div className='absolute right-2 top-[12px] pointer-events-auto z-30'>
						<AuthButtons />
					</div>
				</div>
			</motion.nav>
		</header>
	)
}

const MenuToggle = ({ toggle }: { toggle: any }) => (
	<button onClick={toggle} className='pointer-events-auto absolute z-30'>
		<svg width='23' height='23' viewBox='0 0 23 23'>
			<Path
				variants={{
					closed: { d: 'M 2 2.5 L 20 2.5' },
					open: { d: 'M 3 16.5 L 17 2.5' },
				}}
			/>
			<Path
				d='M 2 9.423 L 20 9.423'
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				transition={{ duration: 0.1 }}
			/>
			<Path
				variants={{
					closed: { d: 'M 2 16.346 L 20 16.346' },
					open: { d: 'M 3 2.5 L 17 16.346' },
				}}
			/>
		</svg>
	</button>
)

const Path = (props: any) => (
	<motion.path fill='transparent' strokeWidth='2' stroke='currentColor' strokeLinecap='round' {...props} />
)

const MenuItem = ({ className, children }: { className?: string; children?: ReactNode }) => {
	return (
		<motion.li variants={MenuItemVariants} className={className}>
			{children}
		</motion.li>
	)
}

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({ item, toggleOpen }) => {
	const pathname = usePathname()
	const [subMenuOpen, setSubMenuOpen] = useState(false)

	return (
		<>
			<MenuItem>
				<button className='flex w-full text-2xl' onClick={() => setSubMenuOpen(!subMenuOpen)}>
					<div className='flex flex-row justify-between w-full items-center'>
						<span className={`${pathname.includes(item.href) ? 'font-bold' : ''}`}>{item.title}</span>
						{/* <div className={`${subMenuOpen && 'rotate-180'}`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div> */}
					</div>
				</button>
			</MenuItem>
			<div className='mt-2 ml-2 flex flex-col space-y-2'>
				{subMenuOpen && (
					<>
						{item.subMenuItems?.map((subItem, subIdx) => {
							return (
								<MenuItem key={subIdx}>
									<Link
										href={subItem.href}
										onClick={() => toggleOpen()}
										className={` ${subItem.href === pathname ? 'font-bold' : ''}`}
									>
										{subItem.title}
									</Link>
								</MenuItem>
							)
						})}
					</>
				)}
			</div>
		</>
	)
}

const MenuItemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
			duration: 0.02,
		},
	},
}

const variants = {
	open: {
		transition: { staggerChildren: 0.02, delayChildren: 0.15 },
	},
	closed: {
		transition: { staggerChildren: 0.01, staggerDirection: -1 },
	},
}

const useDimensions = (ref: any) => {
	const dimensions = useRef({ width: 0, height: 0 })

	useEffect(() => {
		if (ref.current) {
			dimensions.current.width = ref.current.offsetWidth
			dimensions.current.height = ref.current.offsetHeight
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref])

	return dimensions.current
}
