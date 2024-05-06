'use server'

import React from 'react'

import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

import { sendEmail } from './email-actions'
import VerificationTemplate from '../../emails/verification-template'

import { signJwt, verifyJwt } from '@/lib/jwt'
import ResetPasswordTemplate from '../../emails/reset-password-template'

export async function registerUser(user: Partial<User>) {
	try {
		const createdUser = await prisma.user.create({
			data: {
				...user,
				password: await bcrypt.hash(user.password as string, 10),
			} as User,
		})

		// Send verification email
		const emailVerificationToken = signJwt({
			id: createdUser.id,
		})

		await prisma.user.update({
			where: {
				id: createdUser.id,
			},
			data: {
				emailVerificationToken,
			},
		})

		await sendEmail({
			to: [process.env.RESEND_ACCOUNT_EMAIL!, createdUser.email],
			subject: 'Verify your email address',
			react: React.createElement(VerificationTemplate, {
				username: createdUser.username as string,
				emailVerificationToken,
			}),
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

export async function verifyEmail(jwtUserId: string): Promise<'userNotExist' | string> {
	const payload = verifyJwt(jwtUserId)

	if (!payload) return 'userNotExist'

	const userId = payload.id
	const unusedToken = await prisma.user.findUnique({
		where: {
			emailVerificationToken: jwtUserId,
		},
		select: {
			email: true,
			emailVerificationToken: true,
		},
	})

	if (!unusedToken?.emailVerificationToken) return 'userNotExist'

	const emailVerified = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			emailVerified: true,
			emailVerificationToken: null,
		},
	})

	if (emailVerified) return unusedToken.email
	else throw new Error('Something went wrong!')
}

export async function forgotPassword(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			username: true,
			email: true,
		},
	})

	if (!user) return true

	const jwtUserId = signJwt({
		id: user.id,
	})

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			resetPasswordToken: jwtUserId,
		},
	})

	const sendEmailResult = await sendEmail({
		to: [process.env.RESEND_ACCOUNT_EMAIL!, user.email],
		subject: 'Reset your password',
		react: React.createElement(ResetPasswordTemplate, {
			username: user.username as string,
			resetPasswordToken: jwtUserId,
		}),
	})

	return sendEmailResult
}

export async function verifyValidToken(jwtUserId: string): Promise<boolean> {
	const payload = verifyJwt(jwtUserId)

	if (!payload) return false

	const user = await prisma.user.findUnique({
		where: {
			resetPasswordToken: jwtUserId,
		},
		select: {
			id: true,
		},
	})

	if (!user) return false

	return true
}

export async function resetPassword(jwtUserId: string, password: string): Promise<'userNotExist' | 'success'> {
	const payload = verifyJwt(jwtUserId)

	if (!payload) return 'userNotExist'

	const userId = payload.id
	const unusedToken = await prisma.user.findUnique({
		where: {
			resetPasswordToken: jwtUserId,
		},
		select: {
			resetPasswordToken: true,
		},
	})

	if (!unusedToken) return 'userNotExist'

	const passwordUpdated = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			resetPasswordToken: null,
			password: await bcrypt.hash(password, 10),
		},
	})

	if (passwordUpdated) return 'success'
	else throw new Error('Something went wrong!')
}
