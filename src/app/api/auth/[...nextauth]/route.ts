import NextAuth from 'next-auth/next'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import * as bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const authOptions: AuthOptions = {
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

				console.log({ user })

				if (!user) throw new Error('User name or password is not correct')

				if (!credentials?.password) throw new Error('Please, provide your password.')
				const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password)

				if (!isPassowrdCorrect) throw new Error('User name or password is not correct.')

				if (!user.emailVerified) throw new Error('EmailNotVerified')

				const { password, ...userWithoutPass } = user
				return userWithoutPass
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (!profile?.email) {
				throw new Error('No email found in the Google account')
			}

			await prisma.user.upsert({
				where: {
					email: profile.email,
				},
				update: {
					name: profile.name,
					image: profile.image,
				},
				create: {
					email: profile.email,
					name: profile.name ?? '',
					image: profile.image,
					emailVerified: true,
				},
			})
		},

		async jwt({ token, user }) {
			if (user) token.user = user as User
			return token
		},

		async session({ token, session }) {
			session.user = token.user
			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
