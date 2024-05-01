import { User } from '@prisma/client'
// import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: User
	}

	interface User {
		role: string
		username: string | null
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		// user: User
		role: string
		username: string | null
	}
}
