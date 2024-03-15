'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Icons } from '../icons'

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
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const router = useRouter()

	const form = useForm<InputType>({
		// validate inputs
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
						title: 'Please, verify your email first.',
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
				description: "We couldn't create your account. Please try again later!",
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
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<Icons.key
												className={`${form.formState.errors.password ? 'text-destructive' : 'text-muted-foreground'} `}
											/>
											<Input
												type='password'
												placeholder='Your Password'
												className={`${form.formState.errors.password && 'border-destructive bg-destructive/30'}`}
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
						Sign In
					</Button>
				</div>
			</form>
		</Form>
	)
}
