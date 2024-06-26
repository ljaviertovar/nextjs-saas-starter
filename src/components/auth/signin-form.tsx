'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import GoogleButtonSignin from './google-button-signin'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { SpinnerIcon } from '../icons/'

import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
	email: z.string({ required_error: 'Please enter your email' }).email('Please enter a valid email address'),
	password: z.string({
		required_error: 'Please enter your password',
	}),
})

type InputType = z.infer<typeof formSchema>

interface Props {
	callbackUrl?: string
}

export function SignInForm({ callbackUrl }: Props) {
	const [isVisiblePass, setIsVisiblePass] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const toggleVisblePass = () => setIsVisiblePass(prev => !prev)

	const { toast } = useToast()

	const router = useRouter()

	const form = useForm<InputType>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: InputType) {
		try {
			setIsLoading(true)

			const response = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
			})
			if (!response?.ok) {
				if (response?.error === 'EmailNotVerified') {
					toast({
						title: 'Email not verified',
						description: 'Please, verify your email first.',
						variant: 'warning',
					})

					return
				}

				toast({
					title: 'Something went wrong!',
					description: response?.error,
					variant: 'destructive',
				})
				return
			}

			toast({
				title: 'Welcome back! ',
				description: 'Redirecting you to your dashboard!',
			})

			router.push(callbackUrl ? callbackUrl : '/')
		} catch (error) {
			console.log({ error })
			toast({
				title: 'Something went wrong!',
				description: 'Your account could not be accessed. Please try again later!',
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<Icons.email
												className={`${form.formState.errors.email ? 'text-destructive' : 'text-muted-foreground'} `}
											/>
											<Input
												type='email'
												placeholder='Your Email'
												className={`${form.formState.errors.email && 'border-destructive bg-destructive/30'}`}
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-1'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormControl>
									<div className='flex items-center gap-2'>
										<Icons.key
											className={`${form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'} `}
										/>
										<Input
											type={isVisiblePass ? 'text' : 'password'}
											placeholder='Your Password'
											className={`${form.formState.errors.password && 'border-destructive bg-destructive/30'}`}
											{...field}
										/>
										{isVisiblePass ? (
											<Icons.eyeOff
												onClick={toggleVisblePass}
												className={`${form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'} `}
											/>
										) : (
											<Icons.eye
												onClick={toggleVisblePass}
												className={`${form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'} `}
											/>
										)}
									</div>
								</FormControl>
							)}
						/>
					</div>

					<p className='text-center text-sm text-muted-foreground'>
						<Link
							href='/auth/forgot-password'
							className='underline underline-offset-4 hover:text-primary'
						>
							Forgot Password?
						</Link>
					</p>

					<div className='mt-4 flex flex-col gap-4'>
						<Button
							className='text-foreground'
							disabled={isLoading}
						>
							{isLoading && (
								<span className='animate-spin'>
									<SpinnerIcon size={16} />
								</span>
							)}
							Sign In
						</Button>
						<GoogleButtonSignin
							typeSubmit='signin'
							callbackUrl={callbackUrl}
						/>
					</div>
				</div>
			</form>
		</Form>
	)
}
