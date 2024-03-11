'use client'

import { sendActivationEmail } from '@/actions/email-actions'

export default function TestEmailButton() {
	const handleSubmit = async () => {
		sendActivationEmail({
			to: ['luisjavier_tovar@outlook.com', 'lljjtt178@gmail.com'],
			subject: 'Welcome to My SaaS',
		})
	}

	return <button onClick={handleSubmit}>Send Email</button>
}
