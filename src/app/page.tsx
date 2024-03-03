import { Metadata } from 'next'

import AuthButtons from '@/components/auth/auth-buttons'

export const metadata: Metadata = {
	title: 'Starter Kit for SaaS - Launch your Service Today',
	description:
		'Discover the ultimate Starter Kit to build your SaaS. We make it easy to get your project off the ground with essential tools, best practices and step-by-step guides. Perfect for entrepreneurs and developers looking to accelerate the development and launch of their software-as-a-service.',
}

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-between px-24 py-10'>
			<div className='w-full'>
				<AuthButtons />
			</div>

			<div className='z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex'>
				<div className='fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none font-bold text-xl'>
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
				</div>
			</div>

			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
				<div className='text-center'>
					<h1 className='text-[48px] font-medium'>Starter kit for build a SaaS</h1>
					<h2 className='text-[32px] font-medium'>
						Powered by Next.js, NextAuth.js (Auth.js), Prisma, React Hook Form, Zod, Shadcn/ui and more.
					</h2>
				</div>
			</div>
			<div>
				<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-2 lg:grid-cols-4 lg:text-left'>
					Tutorials on how it is built:
				</div>
				<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
					<a
						href='https://hackernoon.com/how-to-implement-authentication-in-nextjs-14-with-nextauthjs-shadcnui-react-hook-form-and-zod'
						className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 dark:border-neutral-700 hover:dark:bg-neutral-800/30'
						target='_blank'
						rel='noopener noreferrer'
					>
						<p className={`mb-3 text-2xl font-semibold`}>
							Authentication{' '}
							<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
								-&gt;
							</span>
						</p>
					</a>
				</div>
			</div>
		</div>
	)
}
