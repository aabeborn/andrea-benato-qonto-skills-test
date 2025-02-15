import { FC, HTMLAttributes, useMemo } from 'react'
import './index.css'

interface Props extends HTMLAttributes<HTMLElement> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
	variant?: 'body-1' | 'title-1'
}

const variantsClasses: Record<NonNullable<Props['variant']>, string> = {
	'body-1': 'text-body-1',
	'title-1': 'text-title-1'
}

const Text: FC<Props> = ({ as = 'span', children, className, variant = 'body-1', ...props }) => {
	const Component = as

	const classes = useMemo(() => {
		return `${variantsClasses[variant]} ${className ?? ''}`
	}, [])

	return (
		<Component
			className={classes}
			{...props}
		>
			{children}
		</Component>
	)
}

export default Text
