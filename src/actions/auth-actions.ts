'use server'

import { Prisma, User } from '@prisma/client'

import * as bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

export async function registerUser(user: Omit<User, 'id' | 'phone' | 'emailVerified' | 'image'>) {
	try {
		const result = await prisma.user.create({
			data: {
				...user,
				password: await bcrypt.hash(user.password, 10),
			},
		})

		return result
	} catch (error) {
		console.log(error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				// Unique constraint failed
				return { error: 'Email already exists.' }
			}
		}

		return { error: 'An unexpected error occurred.' }
	}
}
