import { User } from '@prisma/client'

declare module 'next-auth' {
	interface Session {
		user: User
	}

	interface User {
		isSubscribed: boolean
		username: string | null
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		isSubscribed: boolean
		username: string | null
	}
}
