'use server'

import React from 'react'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface Email {
	to: string[]
	subject: string
	react: React.ReactElement
}

export const sendEmail = async (payload: Email) => {
	const { error } = await resend.emails.send({
		from: 'My SaaS <onboarding@resend.dev>',
		...payload,
	})

	if (error) {
		console.error('Error sending email', error)
		return null
	}

	console.log('Email sent successfully')
	return true
}
