import Text from '@/components/text'
import styles from './page.module.scss'

const TransactionsPage = () => {
	return (
		<Text
			variant='body-1'
			className={styles.transaction__details__empty}
		>
			No transaction selected
		</Text>
	)
}

export default TransactionsPage
