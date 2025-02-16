import Skeleton from '@/components/skeleton'
import styles from './index.module.scss'

const TransactionsTableSkeleton = () => {
	return (
		<>
			<div className={styles.transactions__list__content__skeleton}>
				<div className={styles.transactions__list__content__skeleton__header}>
					{Array.from({ length: 4 }).map((_col, index) => (
						<Skeleton
							key={`skeleton-head-${index.toString()}`}
							className={styles.transactions__list__content__skeleton__header__item}
						/>
					))}
				</div>
				{Array.from({ length: 8 }).map((_row, index) => (
					<div
						key={`skeleton-row-${index.toString()}`}
						className={styles.transactions__list__content__skeleton__row}
					>
						{Array.from({ length: 4 }).map((_cell, cellIndex) => (
							<Skeleton
								key={`skeleton-row-${index.toString()}-${cellIndex.toString()}`}
								className={styles.transactions__list__content__skeleton__row__item}
							/>
						))}
					</div>
				))}
			</div>
		</>
	)
}
export default TransactionsTableSkeleton
