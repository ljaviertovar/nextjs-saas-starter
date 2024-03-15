'use server'

import { Prisma, User } from '@prisma/client'

import * as bcrypt from 'bcrypt'
import crypto from 'crypto'

import { prisma } from '@/lib/prisma'
import { sendEmail } from './email-actions'
import VerificationTemplate from '../../emails/verification-template'
import React from 'react'

export async function registerUser(user: Partial<User>) {
	try {
		const createdUser = await prisma.user.create({
			data: {
				...user,
				password: await bcrypt.hash(user.password as string, 10),
			} as User,
		})

		// Send verification email
		const emailVerificationToken = crypto.randomBytes(32).toString('base64url')

		await prisma.user.update({
			where: {
				id: createdUser.id,
			},
			data: {
				emailVerificationToken,
			},
		})

		await sendEmail({
			to: ['luisjavier_tovar@outlook.com', createdUser.email],
			subject: 'Verify your email address',
			react: React.createElement(VerificationTemplate, { username: createdUser.username, emailVerificationToken }),
		})

		return createdUser
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
