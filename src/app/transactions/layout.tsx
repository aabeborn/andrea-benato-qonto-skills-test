import Header from '@/components/header'
import { type ReactNode } from 'react'
import styles from './layout.module.scss'

interface TransactionsLayoutProps {
	children: ReactNode
}

const TransactionsLayout = ({ children }: TransactionsLayoutProps) => {
	return (
		<main className={styles.transactions}>
			<section className={styles.transactions__list}>
				<Header className={styles.transactions__list__header}>History</Header>
				<div className={styles.transactions__list__content}>table content here</div>
			</section>
			<section className={styles.transactions__details}>{children}</section>
		</main>
	)
}

export default TransactionsLayout
