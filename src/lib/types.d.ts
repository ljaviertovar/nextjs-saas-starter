import { User } from '@prisma/client'

declare module 'next-auth' {
	interface Session {
		user: User
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: User
	}
}
