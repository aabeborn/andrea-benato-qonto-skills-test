export interface Transaction {
	id: string
	amount: number
	date: string
	description: string
	from: string
	to: string
}

export interface TransactionsList {
	transactions: Transaction[]
}
