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
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={`${inter.className} relative`}>
				<AuthProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						disableTransitionOnChange
					>
						<main>{children}</main>

						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
