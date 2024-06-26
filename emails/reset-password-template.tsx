import * as React from 'react'

import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components'

import { getBaseUrl } from '@/utils'

const baseUrl = getBaseUrl()

interface ResetPasswordTemplateProps {
	username: string
	resetPasswordToken: string
}

export const ResetPasswordTemplate = ({ username, resetPasswordToken }: ResetPasswordTemplateProps) => (
	<Html>
		<Head />
		<Preview>The sales intelligence platform that helps you uncover qualified leads.</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src='https://res.cloudinary.com/dbwpoihqk/image/upload/v1710118456/taggy/assets/my-saas.png'
					alt='My SaaS'
					style={logo}
				/>
				<Text style={title}>Hi {username}!</Text>
				<Text style={title}>We have sent this email because you have forgotten your password.</Text>
				<Text style={paragraph}>You can reset your password with the link below:</Text>
				<Section style={btnContainer}>
					<Button
						style={button}
						href={`${baseUrl}/auth/reset-password/${resetPasswordToken}`}
					>
						Click here to reset
					</Button>
				</Section>
				<Hr style={hr} />
				<Text style={footer}>Something in the footer.</Text>
			</Container>
		</Body>
	</Html>
)

export default ResetPasswordTemplate

const main = {
	backgroundColor: '#020817',
	color: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
}

const logo = {
	margin: '0 auto',
}

const title = {
	textAlign: 'center' as const,
	fontWeight: 'bold' as const,
	fontSize: '24px',
	lineHeight: '34px',
}

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
}

const btnContainer = {
	textAlign: 'center' as const,
}

const button = {
	backgroundColor: '#3576DF',
	borderRadius: '1rem',
	color: '#fff',
	fontSize: '16px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '12px',
}

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
}

const footer = {
	color: '#8898aa',
	fontSize: '12px',
}
