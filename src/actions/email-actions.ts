'use server'

import { Resend } from 'resend'
import WelcomeTemplate from '../../emails/welcome-template'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

interface Email {
	to: string[]
	subject: string
}

export const sendActivationEmail = async ({ to, subject }: Email) => {
	const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to,
		subject,
		react: React.createElement(WelcomeTemplate, { userFirstname: 'Alain' }),
	})

	if (error) {
		console.error('Error sending email', error)
		return null
	}

	console.log('Email sent successfully')
	return true
}
