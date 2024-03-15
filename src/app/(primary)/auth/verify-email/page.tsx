import EmailCheckIcon from '@/components/icons/email-check-icon'
import EmailWarningIcon from '@/components/icons/emaill-warning-icon'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import Link from 'next/link'

interface VerifyEmailPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
	let message = 'Verifying email...'
	let verified = false
	if (searchParams.token) {
		const user = await prisma.user.findUnique({
			where: {
				emailVerificationToken: searchParams.token as string,
			},
		})

		if (!user) {
			message = 'User not found. Check your email for the verification link.'
		} else {
			await prisma.user.update({
				where: {
					emailVerificationToken: searchParams.token as string,
				},
				data: {
					emailVerified: true,
					emailVerificationToken: null,
				},
			})

			message = `Email verified!\n${user.email}`
			verified = true
		}
	} else {
		message = 'No email verification token found. Check your email.'
	}

	return (
		<div className='grid place-content-center py-40'>
			<Card className='max-w-sm text-center'>
				<CardHeader>
					<CardTitle>Email Verification</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='w-full grid place-content-center py-4'>
						{verified ? <EmailCheckIcon size={48} /> : <EmailWarningIcon size={48} />}
					</div>
					<p
						className='text-lg text-muted-foreground'
						style={{ textWrap: 'balance' }}
					>
						{message}
					</p>
				</CardContent>
				<CardFooter className=''>
					{verified && (
						<Link
							className='bg-primary text-white text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 rounded-lg w-full text-center'
							href={'/auth/signin'}
						>
							Sign in
						</Link>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
