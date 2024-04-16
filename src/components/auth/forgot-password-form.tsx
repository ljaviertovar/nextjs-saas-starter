'use client'

import { useState } from 'react'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Icons } from '../icons'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { forgotPassword } from '@/actions/auth-actions'

const formSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email('Please enter a valid email address'),
})

type InputType = z.infer<typeof formSchema>

export function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

	const form = useForm<InputType>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: InputType) {
		try {
			setIsLoading(true)

			const result = await forgotPassword(values.email)
			if (result) {
				toast({
					title: 'Reset password link sent!',
					description: 'Please check your email to reset your password.',
					variant: 'success',
				})
			}
		} catch (error) {
			console.error(error)
			toast({
				title: 'Something went wrong!',
				description: `We couldn't create your account.\nPlease try again later!`,
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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

				<Button
					className='w-full text-foreground mt-4'
					disabled={isLoading}
				>
					{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
					Submit
				</Button>
			</form>
		</Form>
	)
}
