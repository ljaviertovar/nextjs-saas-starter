'use client'

import { useEffect, useState } from 'react'
import * as z from 'zod'
import { passwordStrength } from 'check-password-strength'

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Icons } from '../icons'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'

import PasswordStrength from './password-strength'

import { resetPassword } from '@/actions/auth-actions'

const formSchema = z
	.object({
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, 'Password must have at least 6 characters')
			.max(32, 'Password must be up to 32 characters')
			// at least 1 small letter, 1 capital letter, 1 number and 1 special character
			.regex(
				new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$'),
				'Password must contain at least 1 small letter, 1 capital letter, 1 number and 1 special character'
			),
		confirmPassword: z
			.string({ required_error: 'Confirm your password is required' })
			.min(6, 'Password must have at least 6 characters')
			.max(32, 'Password must be up to 32 characters'),
	})
	.refine(values => values.password === values.confirmPassword, {
		message: "Password and Confirm Password doesn't match!",
		path: ['confirmPassword'],
	})

type InputType = z.infer<typeof formSchema>

interface Props {
	jwtUserId: string
}

export function ResetPasswordForm({ jwtUserId }: Props) {
	const [passStrength, setPassStrength] = useState(0)
	const [isVisiblePass, setIsVisiblePass] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

	const form = useForm<InputType>({
		resolver: zodResolver(formSchema),
	})

	const toggleVisblePass = () => setIsVisiblePass(prev => !prev)

	const { password } = form.watch()
	useEffect(() => {
		setPassStrength(passwordStrength(password).id)
	}, [password])

	async function onSubmit(values: InputType) {
		try {
			setIsLoading(true)
			const result = await resetPassword(jwtUserId, values.password)
			if (result === 'success') {
				form.setValue('password', '')
				form.setValue('confirmPassword', '')

				toast({
					title: 'Password Reset Successfully!',
					description: `You can now signin with your new password.`,
					variant: 'success',
				})
			} else {
				toast({
					title: 'Something went wrong!',
					description: `We couldn't reset your password.\nPlease try again later!`,
					variant: 'destructive',
				})
			}
		} catch (error) {
			console.error(error)
			toast({
				title: 'Something went wrong!',
				description: `We couldn't reset your password.\nPlease try again later!`,
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<Icons.key
												className={`${form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'} `}
											/>
											<Input
												type={isVisiblePass ? 'text' : 'password'}
												placeholder='Your new Password'
												className={`${form.formState.errors.password && 'border-destructive bg-destructive/30'}`}
												{...field}
											/>
											{isVisiblePass ? (
												<Icons.eyeOff
													onClick={toggleVisblePass}
													className={`${
														form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'
													} `}
												/>
											) : (
												<Icons.eye
													onClick={toggleVisblePass}
													className={`${
														form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'
													} `}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<PasswordStrength passStrength={passStrength} />

					<div className='grid gap-1'>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<Icons.key
												className={`${
													form.formState.errors.confirmPassword ? 'text-destructive' : 'text-muted-foreground'
												} `}
											/>
											<Input
												type='password'
												placeholder='Confirm your new Password'
												className={`${form.formState.errors.confirmPassword && 'border-destructive bg-destructive/30'}`}
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						className='text-foreground mt-4'
						disabled={isLoading}
					>
						{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}
