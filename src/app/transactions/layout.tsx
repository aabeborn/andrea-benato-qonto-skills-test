import Header from '@/components/header'
import { Suspense, type ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTransactions } from '@/lib/api/transactions'
import TransactionsTable from './_components/transactions-table'

interface TransactionsLayoutProps {
	children: ReactNode
}

const TransactionsLayout = ({ children }: TransactionsLayoutProps) => {
	const transactionsPromise = getTransactions()

	return (
		<main className={styles.transactions}>
			<section className={styles.transactions__list}>
				<Header className={styles.transactions__list__header}>History</Header>
				<div className={styles.transactions__list__content}>
					<Suspense fallback={<div>Loading...</div>}>
						<TransactionsTable transactionsPromise={transactionsPromise} />
					</Suspense>
				</div>
			</section>
			<section className={styles.transactions__details}>{children}</section>
		</main>
	)
}

export default TransactionsLayout
