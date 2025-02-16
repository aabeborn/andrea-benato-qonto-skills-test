import Header from '@/components/header'
import { Suspense, type ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTransactions } from '@/lib/api/transactions'
import TransactionsTable from './_components/transactions-table'
import { TransactionsDataProvider } from './_context/data'
import TransactionsTableSkeleton from './_components/skeleton/transactions-table'
interface TransactionsLayoutProps {
	children: ReactNode
}

const TransactionsLayout = ({ children }: TransactionsLayoutProps) => {
	const transactionsPromise = getTransactions()

	return (
		<TransactionsDataProvider transactionsPromise={transactionsPromise}>
			<main className={styles.transactions}>
				<section className={styles.transactions__list}>
					<Header className={styles.transactions__list__header}>History</Header>
					<div className={styles.transactions__list__content}>
						<Suspense fallback={<TransactionsTableSkeleton />}>
							<TransactionsTable transactionsPromise={transactionsPromise} />
						</Suspense>
					</div>
				</section>

				<section className={styles.transactions__details}>{children}</section>
			</main>
		</TransactionsDataProvider>
	)
}

export default TransactionsLayout
