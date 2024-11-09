import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import AuthProvider from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

import './globals.css'

export const metadata: Metadata = {
	title: 'My SaaS',
	description: 'The best SaaS in the world!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className='scroll-smooth'>
			<body className={`${inter.className} relative scroll-smooth focus:scroll-auto`}>
				<div className='absolute top-0 z-[-2] h-screen w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(55,119,226,0.3),rgba(255,255,255,0))]'></div>
				<AuthProvider>
					<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
						{children}

						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
