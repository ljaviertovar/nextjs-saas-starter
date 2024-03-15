export function getBaseUrl() {
	return process.env.VERCEL_ENV === 'production'
		? `https://www.MY-CUSTOM-DOMAIN.com`
		: process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:3000`
}
