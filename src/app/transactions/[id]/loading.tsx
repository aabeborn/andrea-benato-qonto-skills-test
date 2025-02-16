import Skeleton from '@/components/skeleton'
import styles from './page.module.scss'

const TransactionPageLoading = () => {
	return (
		<div className={styles.transactions__details__item}>
			<div className={styles.transactions__details__item__section}>
				<Skeleton className={styles.transactions__details__item__section__skeleton} />
				<Skeleton className={styles.transactions__details__item__section__skeleton} />
			</div>
			<div className={styles.transactions__details__item__section}>
				<Skeleton className={styles.transactions__details__item__section__skeleton} />
				<Skeleton className={styles.transactions__details__item__section__skeleton} />
			</div>
		</div>
	)
}

export default TransactionPageLoading
