import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'

interface VerifyEmailPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
	if (searchParams.token) {
		const user = await prisma.user.findUnique({
			where: {
				emailVerificationToken: searchParams.token as string,
			},
		})

		if (!user) {
			return (
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			)
		}

		await prisma.user.update({
			where: {
				emailVerificationToken: searchParams.token as string,
			},
			data: {
				emailVerified: true,
				emailVerificationToken: null,
			},
		})

		return (
			<div>
				<h1>
					Email verified for <b>{user.email}</b>!
				</h1>
			</div>
		)
	} else {
		return (
			<div>
				<h1>Verify Email</h1>
				No email verification token found. Check your email.
			</div>
		)
	}
}
