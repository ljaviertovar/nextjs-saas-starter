import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import { ThemeProvider, AuthProvider } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

import './globals.css'

export const metadata: Metadata = {
	title: 'My SaaS',
	description: 'The best SaaS in the world!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className='scroll-smooth'>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<meta name='msapplication-TileColor' content='#ffffff' />
				<meta name='theme-color' content='#171717' />
			</head>
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
