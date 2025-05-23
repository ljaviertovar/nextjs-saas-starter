'use client'

import { useState } from 'react'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SpinnerIcon } from '@/components/icons'

import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { forgotPassword } from '@/actions/auth-actions'
import { Mail } from 'lucide-react'

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
										<Mail
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

				<Button className='text-foreground mt-4' disabled={isLoading}>
					{isLoading && (
						<span className='animate-spin'>
							<SpinnerIcon size={16} />
						</span>
					)}
					Submit
				</Button>
			</form>
		</Form>
	)
}
