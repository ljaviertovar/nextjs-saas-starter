'use client'
import React from 'react'
import { sendEmail } from '@/actions/email-actions'
import VerificationTemplate from '../../emails/verification-template'

export default function TestEmailButton() {
	const handleSubmit = async () => {
		sendEmail({
			to: ['luisjavier_tovar@outlook.com', 'lljjtt178@gmail.com'],
			subject: 'Verify your email address',
			react: VerificationTemplate({
				email: 'lljjtt178@gmail.com',
				emailVerificationToken: 'gkjgjgkj',
			}) as React.ReactElement,
		})
	}

	return <button onClick={handleSubmit}>Send Email</button>
}
