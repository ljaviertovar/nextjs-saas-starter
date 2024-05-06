import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import * as bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'

import type { Adapter } from 'next-auth/adapters'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	pages: {
		signIn: '/auth/signin',
	},
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				})

				if (!user) throw new Error('User name or password is not correct')

				if (!credentials?.password) throw new Error('Please, provide your password.')
				const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password as string)

				if (!isPassowrdCorrect) throw new Error('User name or password is not correct.')

				if (!user.emailVerified) throw new Error('EmailNotVerified')

				const { password, ...userWithoutPass } = user

				return userWithoutPass as any
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: profile.sub,
					name: `${profile.given_name} ${profile.family_name}`,
					username: null,
					email: profile.email,
					image: profile.picture,
					isSubscribed: false,
					emailVerified: profile.email_verified,
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.isSubscribed = user.isSubscribed
				token.username = user.username
			}
			return token
		},

		async session({ token, session }) {
			if (session.user) {
				session.user.isSubscribed = token.isSubscribed
				session.user.username = token.username
			}
			return session
		},
	},
}
