export default function ChangePasswordIcon({ size = 24, color = 'currentColor' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			fill='none'
			stroke={color}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			className='icon icon-tabler icons-tabler-outline icon-tabler-password-user'
			viewBox='0 0 24 24'
		>
			<path
				stroke='none'
				d='M0 0h24v24H0z'
			></path>
			<path d='M12 17v4M10 20l4-2M10 18l4 2M5 17v4M3 20l4-2M3 18l4 2M19 17v4M17 20l4-2M17 18l4 2M9 6a3 3 0 106 0 3 3 0 00-6 0M7 14a2 2 0 012-2h6a2 2 0 012 2'></path>
		</svg>
	)
}
