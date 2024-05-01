import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import crypto from 'crypto'

import { authOptions } from './lib/auth-options'

export function getBaseUrl() {
	return process.env.VERCEL_ENV === 'production'
		? `https://www.MY-CUSTOM-DOMAIN.com`
		: process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:3000`
}

export function generateSecureToken(length = 48) {
	return crypto.randomBytes(length).toString('hex')
}

export async function isLogged(callbackUrl: string) {
	const session = await getServerSession(authOptions)
	if (session && session.user) {
		redirect(callbackUrl || '/')
	}
}
