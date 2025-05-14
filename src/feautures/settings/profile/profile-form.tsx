'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(30, {
			message: 'Username must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please select an email to display.',
		})
		.email(),
	bio: z.string().max(160).min(4),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: 'Please enter a valid URL.' }),
			})
		)
		.optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	bio: 'I am a software engineer',
	urls: [{ value: 'https://hackernoon.com/u/ljaviertovar' }, { value: 'https://github.com/ljaviertovar' }],
}

export default function ProfileForm() {
	const { data: session } = useSession()

	console.log('Session:', session)

	const { toast } = useToast()

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange',
	})

	const { fields, append } = useFieldArray({
		name: 'urls',
		control: form.control,
	})

	async function onSubmit(values: ProfileFormValues) {
		toast({
			title: 'You submitted the following values:',
			description: JSON.stringify(values, null, 2),
		})
	}

	const { setValue } = form

	// Sync session data with the form
	useEffect(() => {
		if (session?.user?.username) {
			setValue('username', session.user.username)
		} else {
			setValue('username', session?.user?.name ?? '')
		}
	}, [session, setValue])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='My user' {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name. It can be your real name or a pseudonym. You can only change this once
								every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a verified email to display' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={`${session?.user.email ?? 'user@example.com'}`}>{`${
										session?.user.email ?? 'user@example.com'
									}`}</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>You can manage verified email addresses in your email settings.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								You can <span>@mention</span> other users and organizations to link to them.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					{fields.map((field, index) => (
						<FormField
							control={form.control}
							key={field.id}
							name={`urls.${index}.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>
									<FormDescription className={cn(index !== 0 && 'sr-only')}>
										Add links to your website, blog, or social media profiles.
									</FormDescription>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button type='button' variant='outline' size='sm' className='mt-2' onClick={() => append({ value: '' })}>
						Add URL
					</Button>
				</div>
				<Button type='submit'>Update profile</Button>
			</form>
		</Form>
	)
}
