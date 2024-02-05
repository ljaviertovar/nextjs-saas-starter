'use server'

import { User } from '@prisma/client'

import * as bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

export async function registerUser(user: Omit<User, 'id' | 'phone' | 'emailVerified' | 'image'>) {
	const result = await prisma.user.create({
		data: {
			...user,
			password: await bcrypt.hash(user.password, 10),
		},
	})

	return result
}
