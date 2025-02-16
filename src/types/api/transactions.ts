export interface Transaction {
	id: string
	created_at: string
	amount: string
	operation_type: string
	counterparty_name: string
	currency: string
}

export interface TransactionsList {
	transactions: Transaction[]
}
