import { ComponentProps, type FC } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

const Skeleton: FC<ComponentProps<'div'>> = ({ className }) => {
	return <div className={clsx(styles.skeleton, className)}></div>
}

export default Skeleton
