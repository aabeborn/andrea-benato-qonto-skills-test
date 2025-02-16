'use server'

import { API_BASE_PATH, TRANSACTIONS_API_PATH } from '@/utils/api'

import type { TransactionsList } from '@/types/api/transactions'

export const getTransactions = async () => {
	try {
		const response = await fetch(`${API_BASE_PATH}${TRANSACTIONS_API_PATH}`, {
			cache: 'no-cache'
		})

		if (!response.ok) {
			throw new Error(
				`${response.status.toString()} - Failed to fetch transactions\nMessage: ${response.statusText}`
			)
		}
		const transactions = (await response.json()) as TransactionsList
		return transactions.transactions
	} catch (error: unknown) {
		console.error(error)
		throw new Error('Failed to fetch transactions')
	}
}
