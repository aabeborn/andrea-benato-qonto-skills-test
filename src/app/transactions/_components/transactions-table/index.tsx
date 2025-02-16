'use client'
import type { Transaction } from '@/types/api/transactions'
import { type FC, use } from 'react'

interface TransactionsTableProps {
	transactionsPromise: Promise<Transaction[]>
}

const TransactionsTable: FC<TransactionsTableProps> = ({ transactionsPromise }) => {
	const transactions = use(transactionsPromise)
	console.log(transactions)
	return <div>Transactions Table</div>
}

export default TransactionsTable
