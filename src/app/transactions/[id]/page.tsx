'use client'
import { use, useMemo } from 'react'
import { useTransactionsData } from '../_context/data'
import styles from './page.module.scss'
import Text from '@/components/text'
import { formatDateFull } from '@/utils/date'
import { convertEuroToDollar } from '@/utils/convert'

interface TransactionPageProps {
	params: Promise<{ id: string }>
}

const TransactionPage = ({ params }: TransactionPageProps) => {
	const { id } = use(params)
	const transactions = use(useTransactionsData())

	const transaction = useMemo(() => transactions.find(transaction => transaction.id === id), [id, transactions])
	return (
		<div className={styles.transactions__details__item}>
			{transaction ? (
				<>
					<div className={styles.transactions__details__item__section}>
						<Text
							variant='body-1'
							className={styles.transactions__details__item__section__main}
						>
							{transaction.operation_type}
						</Text>
						<Text
							variant='body-1'
							className={styles.transactions__details__item__section__sub}
						>
							{formatDateFull(new Date(transaction.created_at))}
						</Text>
					</div>
					<div className={styles.transactions__details__item__section}>
						<Text
							variant='body-1'
							className={styles.transactions__details__item__section__main}
						>
							{transaction.counterparty_name}
						</Text>
						<div className={styles.transactions__details__item__section__group}>
							<Text
								variant='body-1'
								className={styles.transactions__details__item__section__main}
							>
								EUR {transaction.amount}
							</Text>
							<Text
								variant='body-1'
								className={styles.transactions__details__item__section__sub}
							>
								USD {convertEuroToDollar(Number.parseFloat(transaction.amount))}
							</Text>
						</div>
					</div>
				</>
			) : (
				<Text
					variant='body-1'
					className={styles.transaction__details__empty}
				>
					No transaction available
				</Text>
			)}
		</div>
	)
}

export default TransactionPage
