import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

import { SignUpForm } from '@/components/auth/signup-form'
import { Button } from '@/components/ui/button'

import { isLogged } from '@/utils'

export const metadata: Metadata = {
	title: 'Sign up for My SaaS - Start Now',
	description:
		'Sign up today at My SaaS to access a personalized [type of service or product] experience. Enjoy exclusive features like [feature 1], [feature 2], and [feature 3]. Join our community and start taking advantage of all the benefits of membership from day one - creating your account is fast, easy and secure!',
}

interface Props {
	searchParams: {
		callbackUrl?: string
	}
}

export default async function signUpPage({ searchParams }: Props) {
	await isLogged(searchParams.callbackUrl as string)

	return (
		<>
			<div className='lg:h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-0'>
				<div className='relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
					<div className='absolute inset-0 bg-slate-900'>
						<Image
							alt='My SaaS - Authentication'
							src={'/img/bg-1.jpg'}
							fill
							style={{ objectFit: 'cover' }}
							className='opacity-60'
						/>
					</div>
					<div className='relative z-20 flex items-center text-xl font-medium mb-16'>
						<Link
							href='/'
							className='inline-flex'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='mr-2 h-6 w-6'
							>
								<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
							</svg>
							My SaaS
						</Link>
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p
								className='text-lg shadow'
								style={{ textShadow: '1px 1px 10px rgba(0,0,0,0.6)' }}
							>
								&ldquo;This starter kit has saved me countless hours of work and helped me deliver stunning designs to
								my clients faster than ever before.&rdquo;
							</p>
						</blockquote>
						<p className='mt-6'>
							This background was created by GPT:{' '}
							<Link
								href='https://chat.openai.com/g/g-u5PHms7P2-programmer-s-room-artisan'
								rel='noopener noreferrer'
								target='_blank'
								className='underline underline-offset-2 hover:text-primary'
							>
								<strong>Programmer&apos;s Room Artisan</strong>
							</Link>
						</p>
					</div>
				</div>
				<div className='w-auto lg:w-[1000px] min-h-screen p-10 grid place-content-center relative'>
					<div className='absolute right-6 top-6'>
						<Button
							size={'sm'}
							variant={'secondary'}
							asChild
						>
							<Link href='/auth/signin'>Sign In</Link>
						</Button>
					</div>
					<div className='w-full max-w-[375px]'>
						<div className='flex flex-col text-center my-6 space-y-2'>
							<h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
							<p className='text-sm text-muted-foreground'>Enter the info below to create your account</p>
						</div>
						<SignUpForm />
						<p className='px-8 py-6 text-center text-sm text-muted-foreground'>
							By clicking continue, you agree to our{' '}
							<Link
								href='/terms'
								className='underline underline-offset-4 hover:text-primary'
							>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href='/privacy'
								className='underline underline-offset-4 hover:text-primary'
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
