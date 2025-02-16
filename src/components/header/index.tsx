import { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import Text from '@/components/text'
import styles from './index.module.scss'

const Header: FC<ComponentProps<'header'>> = ({ className, children, ...props }) => {
	return (
		<header
			className={clsx(styles.header, className)}
			{...props}
		>
			<Text variant='title-1'>{children}</Text>
		</header>
	)
}

export default Header
