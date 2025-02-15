import { FC, HTMLAttributes, useMemo } from 'react'
import './index.css'
import clsx from 'clsx'

type Variant = 'body-1' | 'title-1'
interface Props extends HTMLAttributes<HTMLElement> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
	variant?: Variant
}

const variantsClasses: Record<Variant, string> = {
	'body-1': 'text-body-1',
	'title-1': 'text-title-1'
}

const Text: FC<Props> = ({ as = 'span', children, className, variant = 'body-1', ...props }) => {
	const Component = as
	const classes = useMemo(() => clsx(variantsClasses[variant], className), [variant, className])
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
