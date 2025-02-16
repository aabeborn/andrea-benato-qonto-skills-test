'use client'
import { createContext, type ReactNode, type FC, use } from 'react'

import type { Transaction } from '@/types/api/transactions'

interface TransactionsDataProviderProps {
	transactionsPromise: Promise<Transaction[]>
	children: ReactNode
}

export const useTransactionsData = () => {
	const transactions = use(TransactionsDataContext)

	if (!transactions) {
		throw new Error('useTransactionsData must be used within a TransactionsDataProvider')
	}

	return transactions
}

// eslint-disable-next-line unicorn/no-null
export const TransactionsDataContext = createContext<Promise<Transaction[]> | null>(null)

export const TransactionsDataProvider: FC<TransactionsDataProviderProps> = ({ children, transactionsPromise }) => {
	return <TransactionsDataContext.Provider value={transactionsPromise}>{children}</TransactionsDataContext.Provider>
}
