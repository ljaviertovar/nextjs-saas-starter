import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

import ChangePasswordIcon from '@/components/icons/change-password-icon'

import { verifyValidToken } from '@/actions/auth-actions'

import { isLogged } from '@/utils'

interface Props {
	params: {
		jwt: string
	}
	searchParams: {
		callbackUrl?: string
	}
}

export default async function ResetPasswordPage({ params, searchParams }: Props) {
	await isLogged(searchParams.callbackUrl as string)

	const isTokenValid = await verifyValidToken(params.jwt)

	return (
		<div className='grid place-content-center py-40'>
			<Card className='w-80 max-w-sm text-center'>
				<CardHeader>
					<CardTitle className={`${!isTokenValid && 'text-destructive'}`}>Reset Password</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='w-full grid place-content-center py-4'>
						<ChangePasswordIcon
							size={56}
							color={`${!isTokenValid ? '#7F1D1D' : 'currentColor'}`}
						/>
					</div>

					{isTokenValid ? (
						<ResetPasswordForm jwtUserId={params.jwt} />
					) : (
						<p className={`${!isTokenValid && 'text-destructive'}`}>The URL is not valid!</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
